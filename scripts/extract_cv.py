from docx import Document
from pathlib import Path
import json
import re


CV_FILE = Path("cv/Sangay Wangchuk CV (complete).docx")
OUTPUT_DIR = Path("data/cv")


def clean_text(text):
    """Normalize whitespace and remove empty/placeholder content."""
    text = re.sub(r"\s+", " ", text).strip()

    # Remove accidental placeholder text appearing at the beginning
    if text.lower() in {"q", "qq"}:
        return ""

    return text


def extract_paragraphs(document):
    """Extract non-empty paragraphs from the Word document."""
    paragraphs = []

    for paragraph in document.paragraphs:
        text = clean_text(paragraph.text)

        if text:
            paragraphs.append(text)

    return paragraphs


def extract_tables(document):
    """Extract non-empty table contents."""
    tables = []

    for table in document.tables:
        rows = []

        for row in table.rows:
            cells = [clean_text(cell.text) for cell in row.cells]

            if any(cells):
                rows.append(cells)

        if rows:
            tables.append(rows)

    return tables


def extract_section(paragraphs, start_heading, end_headings):
    """
    Extract paragraphs between a start heading and the next recognised heading.
    """

    section = []
    collecting = False

    for paragraph in paragraphs:

        if paragraph.upper() == start_heading.upper():
            collecting = True
            continue

        if collecting and paragraph.upper() in [
            heading.upper() for heading in end_headings
        ]:
            break

        if collecting:
            section.append(paragraph)

    return section


def parse_publications(paragraphs):
    """Extract peer-reviewed journal articles."""

    start_heading = "Peer-Reviewed Journal Articles"

    end_headings = [
        "SUBMITTED MANUSCRIPT",
        "PhD Thesis",
        "RESEARCH REPORTS",
        "TRAINING/SEMINAR/WORKSHOP/CONFERENCE",
        "REFEREES"
    ]

    articles = extract_section(
        paragraphs,
        start_heading,
        end_headings
    )

    publications = []

    for article in articles:

        # Ignore accidental repeated subsection headings
        if article.lower() == "peer-reviewed journal articles":
            continue

        # A publication normally contains a year in parentheses.
        if re.search(r"\(\d{4}\)", article):

            year_match = re.search(r"\((\d{4})\)", article)

            year = int(year_match.group(1)) if year_match else None

            doi_match = re.search(
                r"https://doi\.org/[^\s]+",
                article
            )

            doi = doi_match.group(0).rstrip(".") if doi_match else ""

            publications.append(
                {
                    "year": year,
                    "citation": article,
                    "doi": doi
                }
            )

    return publications


def parse_submitted_manuscript(paragraphs):
    """Extract submitted manuscripts."""

    manuscripts = extract_section(
        paragraphs,
        "SUBMITTED MANUSCRIPT",
        [
            "PhD Thesis",
            "RESEARCH REPORTS",
            "TRAINING/SEMINAR/WORKSHOP/CONFERENCE",
            "REFEREES"
        ]
    )

    return [
        manuscript
        for manuscript in manuscripts
        if manuscript.lower() != "peer-reviewed journal articles"
    ]


def parse_thesis(paragraphs):
    """Extract PhD thesis information."""

    thesis = extract_section(
        paragraphs,
        "PhD Thesis",
        [
            "RESEARCH REPORTS",
            "TRAINING/SEMINAR/WORKSHOP/CONFERENCE",
            "REFEREES"
        ]
    )

    return thesis


def parse_research_reports(paragraphs):
    """Extract research reports."""

    return extract_section(
        paragraphs,
        "RESEARCH REPORTS",
        [
            "TRAINING/SEMINAR/WORKSHOP/CONFERENCE",
            "REFEREES"
        ]
    )


def parse_research_projects(paragraphs):
    """Extract research projects and professional research activities."""

    section = extract_section(
        paragraphs,
        "PROFESSIONAL SERVICES",
        [
            "RESEARCH GRANTS",
            "AWARDS AND SCHOLARSHIPS/FINANCIAL SUPPORT",
            "SKILLS AND COMPETENCIES",
            "RESEARCH PUBLICATIONS"
        ]
    )

    research_keywords = [
        "Principal Investigator",
        "Co-principal Investigator",
        "Co-PI",
        "Core Member of the research project",
        "research project"
    ]

    projects = []

    for paragraph in section:

        if any(
            keyword.lower() in paragraph.lower()
            for keyword in research_keywords
        ):
            projects.append(paragraph)

    return projects


def parse_profile(paragraphs):
    """Extract selected professional profile information."""

    section = extract_section(
        paragraphs,
        "PROFESSIONAL SERVICES",
        [
            "RESEARCH GRANTS",
            "AWARDS AND SCHOLARSHIPS/FINANCIAL SUPPORT",
            "SKILLS AND COMPETENCIES",
            "RESEARCH PUBLICATIONS"
        ]
    )

    return section


def parse_awards(paragraphs):
    """Extract awards and scholarships."""

    return extract_section(
        paragraphs,
        "AWARDS AND SCHOLARSHIPS/FINANCIAL SUPPORT",
        [
            "SKILLS AND COMPETENCIES",
            "RESEARCH PUBLICATIONS"
        ]
    )


def main():

    if not CV_FILE.exists():
        raise FileNotFoundError(
            f"CV file not found: {CV_FILE}"
        )

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    document = Document(CV_FILE)

    paragraphs = extract_paragraphs(document)
    tables = extract_tables(document)

    # ---------------------------------------------------------
    # Raw CV extraction
    # ---------------------------------------------------------

    with open(
        OUTPUT_DIR / "cv_text.json",
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            {
                "source": str(CV_FILE),
                "paragraphs": paragraphs,
                "tables": tables
            },
            file,
            ensure_ascii=False,
            indent=2
        )

    # ---------------------------------------------------------
    # Structured publications
    # ---------------------------------------------------------

    publications = parse_publications(paragraphs)

    with open(
        OUTPUT_DIR / "publications.json",
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            {
                "source": str(CV_FILE),
                "peer_reviewed_journal_articles": publications,
                "article_count": len(publications)
            },
            file,
            ensure_ascii=False,
            indent=2
        )

    # ---------------------------------------------------------
    # Submitted manuscript
    # ---------------------------------------------------------

    manuscripts = parse_submitted_manuscript(paragraphs)

    # ---------------------------------------------------------
    # Thesis
    # ---------------------------------------------------------

    thesis = parse_thesis(paragraphs)

    # ---------------------------------------------------------
    # Research reports
    # ---------------------------------------------------------

    reports = parse_research_reports(paragraphs)

    # ---------------------------------------------------------
    # Research projects
    # ---------------------------------------------------------

    research_projects = parse_research_projects(paragraphs)

    with open(
        OUTPUT_DIR / "research.json",
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            {
                "source": str(CV_FILE),
                "projects": research_projects,
                "reports": reports,
                "submitted_manuscripts": manuscripts,
                "phd_thesis": thesis
            },
            file,
            ensure_ascii=False,
            indent=2
        )

    # ---------------------------------------------------------
    # Profile / professional services
    # ---------------------------------------------------------

    profile = parse_profile(paragraphs)

    awards = parse_awards(paragraphs)

    with open(
        OUTPUT_DIR / "profile.json",
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            {
                "source": str(CV_FILE),
                "professional_services": profile,
                "awards_and_scholarships": awards
            },
            file,
            ensure_ascii=False,
            indent=2
        )

    # ---------------------------------------------------------
    # Report results
    # ---------------------------------------------------------

    print("==========================================")
    print("CV extraction completed successfully.")
    print("==========================================")
    print(f"Paragraphs extracted : {len(paragraphs)}")
    print(f"Tables extracted     : {len(tables)}")
    print(f"Journal articles     : {len(publications)}")
    print(f"Research projects    : {len(research_projects)}")
    print(f"Research reports     : {len(reports)}")
    print(f"Submitted manuscripts: {len(manuscripts)}")
    print(f"PhD thesis entries   : {len(thesis)}")
    print(f"Awards/support       : {len(awards)}")
    print("==========================================")


if __name__ == "__main__":
    main()
