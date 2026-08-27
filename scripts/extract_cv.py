from docx import Document
from pathlib import Path
import json
import re


# =========================================================
# FILE LOCATIONS
# =========================================================

CV_FILE = Path("cv/Sangay Wangchuk CV (complete).docx")
OUTPUT_DIR = Path("data/cv")


# =========================================================
# TEXT CLEANING
# =========================================================

def clean_text(text):
    """
    Normalize whitespace and remove empty/placeholder content.
    """

    text = re.sub(r"\s+", " ", text).strip()

    # Remove accidental placeholder text
    if text.lower() in {"q", "qq"}:
        return ""

    return text


# =========================================================
# PARAGRAPH EXTRACTION
# =========================================================

def extract_paragraphs(document):
    """
    Extract non-empty paragraphs from the Word document.
    """

    paragraphs = []

    for paragraph in document.paragraphs:

        text = clean_text(paragraph.text)

        if text:
            paragraphs.append(text)

    return paragraphs


# =========================================================
# TABLE EXTRACTION
# =========================================================

def extract_tables(document):
    """
    Extract non-empty table contents.
    """

    tables = []

    for table in document.tables:

        rows = []

        for row in table.rows:

            cells = [
                clean_text(cell.text)
                for cell in row.cells
            ]

            if any(cells):
                rows.append(cells)

        if rows:
            tables.append(rows)

    return tables


# =========================================================
# SECTION EXTRACTION
# =========================================================

def extract_section(paragraphs, start_heading, end_headings):
    """
    Extract paragraphs between a start heading
    and the next recognised heading.
    """

    section = []
    collecting = False

    end_headings_upper = [
        heading.upper()
        for heading in end_headings
    ]

    for paragraph in paragraphs:

        if paragraph.upper() == start_heading.upper():
            collecting = True
            continue

        if (
            collecting
            and paragraph.upper() in end_headings_upper
        ):
            break

        if collecting:
            section.append(paragraph)

    return section


# =========================================================
# PUBLICATION METADATA
# =========================================================
#
# This metadata provides the structured publication
# information used by the website.
#
# The DOI is used as the unique identifier.
#
# IMPORTANT:
# Q1, Impact Factor and JCR year are stored separately.
# They are NOT repeated inside the "details" field.
#
# =========================================================

PUBLICATION_METADATA = {

    "10.1016/j.jece.2026.123838": {
        "category": "Environmental Monitoring",
        "quartile": "Q1",
        "impactFactor": "7.5",
        "metricYear": "2025"
    },

    "10.1021/acsanm.5c05854": {
        "category": "Biomedical / Wearable Sensors",
        "quartile": "Q1",
        "impactFactor": "5.5",
        "metricYear": "2024"
    },

    "10.1016/j.microc.2026.117476": {
        "category": "Forensic Electrochemistry",
        "quartile": "Q1",
        "impactFactor": "5.1",
        "metricYear": "2024"
    },

    "10.1016/j.microc.2025.114935": {
        "category": "Forensic Electrochemistry",
        "quartile": "Q1",
        "impactFactor": "5.1",
        "metricYear": "2024"
    },

    "10.1016/j.talanta.2025.128715": {
        "category": "Forensic Electrochemistry",
        "quartile": "Q1",
        "impactFactor": "6.1",
        "metricYear": "2024"
    },

    "10.1016/j.mtchem.2025.102872": {
        "category": "Sustainable Nanomaterials",
        "quartile": "Q1",
        "impactFactor": "6.7",
        "metricYear": "2024"
    },

    "10.1021/acsomega.5c03662": {
        "category": "Forensic Electrochemistry",
        "quartile": "Q1",
        "impactFactor": "4.3",
        "metricYear": "2024"
    },

    "10.1016/j.talanta.2025.128431": {
        "category": "Environmental / Food Analysis",
        "quartile": "Q1",
        "impactFactor": "6.1",
        "metricYear": "2024"
    },

    "10.1016/j.talanta.2025.128166": {
        "category": "Environmental Analysis",
        "quartile": "Q1",
        "impactFactor": "6.1",
        "metricYear": "2024"
    },

    "10.1016/j.microc.2025.113623": {
        "category": "Biomedical / Glucose Sensing",
        "quartile": "Q1",
        "impactFactor": "5.1",
        "metricYear": "2024"
    },

    "10.1016/j.talanta.2025.127776": {
        "category": "Environmental Analysis",
        "quartile": "Q1",
        "impactFactor": "6.1",
        "metricYear": "2024"
    },

    "10.1016/j.talanta.2025.127722": {
        "category": "Food / Electrochemical Analysis",
        "quartile": "Q1",
        "impactFactor": "6.1",
        "metricYear": "2024"
    },

    "10.1016/j.talanta.2025.127581": {
        "category": "Environmental Monitoring",
        "quartile": "Q1",
        "impactFactor": "6.1",
        "metricYear": "2024"
    },

    "10.1016/j.talanta.2024.127123": {
        "category": "Food / Forensic Analysis",
        "quartile": "Q1",
        "impactFactor": "6.1",
        "metricYear": "2024"
    },

    "10.1016/j.microc.2024.112217": {
        "category": "Biomedical Analysis",
        "quartile": "Q1",
        "impactFactor": "5.1",
        "metricYear": "2024"
    },

    "10.1016/j.microc.2024.112216": {
        "category": "Biomedical Analysis",
        "quartile": "Q1",
        "impactFactor": "5.1",
        "metricYear": "2024"
    },

    "10.1016/j.mtchem.2024.102271": {
        "category": "Biosensors",
        "quartile": "Q1",
        "impactFactor": "6.7",
        "metricYear": "2024"
    },

    "10.1016/j.microc.2024.111100": {
        "category": "Environmental Monitoring",
        "quartile": "Q1",
        "impactFactor": "5.1",
        "metricYear": "2024"
    },

    "10.1016/j.talanta.2024.126179": {
        "category": "Environmental Monitoring",
        "quartile": "Q1",
        "impactFactor": "6.1",
        "metricYear": "2024"
    },

    "10.1016/j.electacta.2024.144292": {
        "category": "Biomedical / Glucose Sensing",
        "quartile": "Q1",
        "impactFactor": "5.6",
        "metricYear": "2024"
    },

    "10.1016/j.foodchem.2024.138987": {
        "category": "Food / Environmental Analysis",
        "quartile": "Q1",
        "impactFactor": "9.8",
        "metricYear": "2024"
    },

    "10.1016/j.talanta.2024.125822": {
        "category": "Forensic Analysis",
        "quartile": "Q1",
        "impactFactor": "6.1",
        "metricYear": "2024"
    },

    "10.1016/j.talanta.2024.125751": {
        "category": "Environmental Analysis",
        "quartile": "Q1",
        "impactFactor": "6.1",
        "metricYear": "2024"
    },

    "10.1149/1945-7111/acdb9d": {
        "category": "Forensic Electrochemistry",
        "quartile": "Q1",
        "impactFactor": "3.1",
        "metricYear": "2023"
    },

    "10.1016/j.microc.2023.108668": {
        "category": "Forensic / Food Analysis",
        "quartile": "Q1",
        "impactFactor": "4.9",
        "metricYear": "2023"
    },

    "10.1016/j.talanta.2023.124266": {
        "category": "Biomedical / Biosensors",
        "quartile": "Q1",
        "impactFactor": "5.6",
        "metricYear": "2023"
    },

    "10.1016/j.jelechem.2022.116995": {
        "category": "Electrocatalysis",
        "quartile": "Q1",
        "impactFactor": "4.5",
        "metricYear": "2023"
    },

    "10.1016/j.electacta.2022.141439": {
        "category": "Forensic Electrochemistry",
        "quartile": "Q1",
        "impactFactor": "6.6",
        "metricYear": "2022"
    },

    "10.1016/j.electacta.2022.141272": {
        "category": "Environmental Analysis",
        "quartile": "Q1",
        "impactFactor": "6.6",
        "metricYear": "2022"
    },

    "10.17102/bjrd.rub.11.1.026": {
        "category": "Food Analysis / Bhutan",
        "quartile": "",
        "impactFactor": "",
        "metricYear": ""
    }
}


# =========================================================
# CLEAN PUBLICATION DETAILS
# =========================================================

def clean_publication_details(details):
    """
    Remove duplicated Q1 / Impact Factor information from
    the publication details.

    Examples removed:

        (Q1, IF 5.1)
        (Q1, IF 5. 1)
        (Q1, IF 6.1).
        Q1, IF 5.1

    The structured fields quartile, impactFactor and
    metricYear remain responsible for displaying this
    information on the website.
    """

    if not details:
        return ""

    # Normalize spaces inside IF values
    details = re.sub(
        r"IF\s+(\d+)\s*\.\s*(\d+)",
        r"IF \1.\2",
        details,
        flags=re.IGNORECASE
    )

    # Remove parenthetical Q1/IF metadata
    details = re.sub(
        r"\(\s*Q\d\s*,\s*IF\s+\d+(?:\.\s*\d+)?\s*\)",
        "",
        details,
        flags=re.IGNORECASE
    )

    # Remove standalone Q1 / IF metadata if present
    details = re.sub(
        r"\bQ\d\s*,\s*IF\s+\d+(?:\.\s*\d+)?",
        "",
        details,
        flags=re.IGNORECASE
    )

    # Remove any remaining standalone IF statement
    details = re.sub(
        r"\bIF\s+\d+(?:\.\s*\d+)?",
        "",
        details,
        flags=re.IGNORECASE
    )

    # Remove redundant punctuation and whitespace
    details = re.sub(
        r"\s+",
        " ",
        details
    ).strip()

    details = re.sub(
        r"\(\s*\)",
        "",
        details
    ).strip()

    details = re.sub(
        r"\s+\.",
        ".",
        details
    )

    details = details.strip(" .")

    return details


# =========================================================
# DOI EXTRACTION
# =========================================================

def extract_doi(text):
    """
    Extract DOI from a citation.
    """

    match = re.search(
        r"https://doi\.org/([^\s]+)",
        text,
        flags=re.IGNORECASE
    )

    if not match:
        return ""

    doi_suffix = match.group(1).rstrip(
        ".,;:)"
    )

    return "https://doi.org/" + doi_suffix


# =========================================================
# PUBLICATION PARSER
# =========================================================

def parse_publications(paragraphs):
    """
    Extract peer-reviewed journal articles and convert
    them into structured publication records.
    """

    articles = extract_section(
        paragraphs,
        "Peer-Reviewed Journal Articles",
        [
            "SUBMITTED MANUSCRIPT",
            "PhD Thesis",
            "RESEARCH REPORTS",
            "TRAINING/SEMINAR/WORKSHOP/CONFERENCE",
            "REFEREES"
        ]
    )

    publications = []

    for article in articles:

        # -------------------------------------------------
        # Ignore repeated subsection headings
        # -------------------------------------------------

        if article.lower() == "peer-reviewed journal articles":
            continue

        # -------------------------------------------------
        # Publication must contain a four-digit year
        # -------------------------------------------------

        year_match = re.search(
            r"\((\d{4})\)",
            article
        )

        if not year_match:
            continue

        year = int(year_match.group(1))

        # -------------------------------------------------
        # DOI
        # -------------------------------------------------

        doi = extract_doi(article)

        doi_key = ""

        if doi:

            doi_key = doi.replace(
                "https://doi.org/",
                ""
            ).lower()

        # -------------------------------------------------
        # Remove DOI from citation
        # -------------------------------------------------

        citation_without_doi = article

        doi_match = re.search(
            r"https://doi\.org/[^\s]+",
            article,
            flags=re.IGNORECASE
        )

        if doi_match:

            citation_without_doi = article[
                :doi_match.start()
            ].rstrip(" .")

        # -------------------------------------------------
        # Extract text before and after publication year
        # -------------------------------------------------

        before_year = citation_without_doi[
            :year_match.start()
        ].strip()

        after_year = citation_without_doi[
            year_match.end():
        ].strip()

        # Remove leading punctuation after year
        after_year = re.sub(
            r"^[\s\.\-–—:]+",
            "",
            after_year
        )

        # -------------------------------------------------
        # Authors
        # -------------------------------------------------

        authors = before_year.rstrip(" .")

        # -------------------------------------------------
        # Title / Journal / Details
        # -------------------------------------------------

        title = ""
        journal = ""
        details = ""

        # Split citation into sentence-like sections.
        #
        # Standard CV format:
        #
        # Authors (Year). Title. Journal. Volume/pages/details.
        #
        parts = [
            part.strip()
            for part in re.split(
                r"\.\s+",
                after_year
            )
            if part.strip()
        ]

        if len(parts) >= 1:
            title = parts[0]

        if len(parts) >= 2:
            journal = parts[1]

        if len(parts) >= 3:
            details = ". ".join(parts[2:])

        # -------------------------------------------------
        # Clean title
        # -------------------------------------------------

        title = re.sub(
            r"\s+",
            " ",
            title
        ).strip(" .")

        # -------------------------------------------------
        # Clean journal
        # -------------------------------------------------

        journal = re.sub(
            r"\s+",
            " ",
            journal
        ).strip(" .")

        # -------------------------------------------------
        # Clean publication details
        # -------------------------------------------------

        details = clean_publication_details(
            details
        )

        # -------------------------------------------------
        # Existing structured metadata
        # -------------------------------------------------

        metadata = PUBLICATION_METADATA.get(
            doi_key,
            {}
        )

        category = metadata.get(
            "category",
            "Research Publication"
        )

        quartile = metadata.get(
            "quartile",
            ""
        )

        impact_factor = metadata.get(
            "impactFactor",
            ""
        )

        metric_year = metadata.get(
            "metricYear",
            ""
        )

        # -------------------------------------------------
        # Create structured publication record
        # -------------------------------------------------

        publication = {
            "year": year,
            "authors": authors,
            "title": title,
            "journal": journal,
            "category": category,
            "quartile": quartile,
            "impactFactor": impact_factor,
            "metricYear": metric_year,
            "details": details,
            "doi": doi,
            "citation": article
        }

        publications.append(publication)

    return publications


# =========================================================
# SUBMITTED MANUSCRIPT
# =========================================================

def parse_submitted_manuscript(paragraphs):
    """
    Extract submitted manuscripts.
    """

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


# =========================================================
# PHD THESIS
# =========================================================

def parse_thesis(paragraphs):
    """
    Extract PhD thesis information.
    """

    return extract_section(
        paragraphs,
        "PhD Thesis",
        [
            "RESEARCH REPORTS",
            "TRAINING/SEMINAR/WORKSHOP/CONFERENCE",
            "REFEREES"
        ]
    )


# =========================================================
# RESEARCH REPORTS
# =========================================================

def parse_research_reports(paragraphs):
    """
    Extract research reports.
    """

    return extract_section(
        paragraphs,
        "RESEARCH REPORTS",
        [
            "TRAINING/SEMINAR/WORKSHOP/CONFERENCE",
            "REFEREES"
        ]
    )


# =========================================================
# RESEARCH PROJECTS
# =========================================================

def parse_research_projects(paragraphs):
    """
    Extract research projects and professional research
    activities.
    """

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


# =========================================================
# PROFESSIONAL PROFILE
# =========================================================

def parse_profile(paragraphs):
    """
    Extract selected professional profile information.
    """

    return extract_section(
        paragraphs,
        "PROFESSIONAL SERVICES",
        [
            "RESEARCH GRANTS",
            "AWARDS AND SCHOLARSHIPS/FINANCIAL SUPPORT",
            "SKILLS AND COMPETENCIES",
            "RESEARCH PUBLICATIONS"
        ]
    )


# =========================================================
# AWARDS
# =========================================================

def parse_awards(paragraphs):
    """
    Extract awards and scholarships.
    """

    return extract_section(
        paragraphs,
        "AWARDS AND SCHOLARSHIPS/FINANCIAL SUPPORT",
        [
            "SKILLS AND COMPETENCIES",
            "RESEARCH PUBLICATIONS"
        ]
    )


# =========================================================
# MAIN
# =========================================================

def main():

    # -----------------------------------------------------
    # Verify CV
    # -----------------------------------------------------

    if not CV_FILE.exists():

        raise FileNotFoundError(
            f"CV file not found: {CV_FILE}"
        )

    # -----------------------------------------------------
    # Create output directory
    # -----------------------------------------------------

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    # -----------------------------------------------------
    # Load Word document
    # -----------------------------------------------------

    document = Document(CV_FILE)

    # -----------------------------------------------------
    # Extract raw content
    # -----------------------------------------------------

    paragraphs = extract_paragraphs(
        document
    )

    tables = extract_tables(
        document
    )

    # =====================================================
    # RAW CV EXTRACTION
    # =====================================================

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

    # =====================================================
    # STRUCTURED PUBLICATIONS
    # =====================================================

    publications = parse_publications(
        paragraphs
    )

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

    # =====================================================
    # SUBMITTED MANUSCRIPT
    # =====================================================

    manuscripts = parse_submitted_manuscript(
        paragraphs
    )

    # =====================================================
    # PHD THESIS
    # =====================================================

    thesis = parse_thesis(
        paragraphs
    )

    # =====================================================
    # RESEARCH REPORTS
    # =====================================================

    reports = parse_research_reports(
        paragraphs
    )

    # =====================================================
    # RESEARCH PROJECTS
    # =====================================================

    research_projects = parse_research_projects(
        paragraphs
    )

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

    # =====================================================
    # PROFILE AND AWARDS
    # =====================================================

    profile = parse_profile(
        paragraphs
    )

    awards = parse_awards(
        paragraphs
    )

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

    # =====================================================
    # VALIDATION / REPORT
    # =====================================================

    print("==========================================")
    print("CV extraction completed successfully.")
    print("==========================================")

    print(
        f"Paragraphs extracted : {len(paragraphs)}"
    )

    print(
        f"Tables extracted     : {len(tables)}"
    )

    print(
        f"Journal articles     : {len(publications)}"
    )

    print(
        f"Research projects    : {len(research_projects)}"
    )

    print(
        f"Research reports     : {len(reports)}"
    )

    print(
        f"Submitted manuscripts: {len(manuscripts)}"
    )

    print(
        f"PhD thesis entries   : {len(thesis)}"
    )

    print(
        f"Awards/support       : {len(awards)}"
    )

    # =====================================================
    # PUBLICATION VALIDATION
    # =====================================================

    if len(publications) == 30:

        print(
            "✓ Publication validation PASSED: "
            "30 articles detected."
        )

    else:

        print(
            "⚠ Publication validation WARNING: "
            f"{len(publications)} articles detected; "
            "expected 30."
        )

    # =====================================================
    # METADATA VALIDATION
    # =====================================================

    metadata_missing = []

    for publication in publications:

        doi = publication.get(
            "doi",
            ""
        )

        doi_key = doi.replace(
            "https://doi.org/",
            ""
        ).lower()

        if doi_key and doi_key not in PUBLICATION_METADATA:

            metadata_missing.append(
                doi_key
            )

    if metadata_missing:

        print(
            "⚠ Metadata warning: "
            f"{len(metadata_missing)} publication(s) "
            "do not have predefined metadata."
        )

        for doi in metadata_missing:

            print(
                f"  - {doi}"
            )

    else:

        print(
            "✓ Publication metadata validation PASSED."
        )

    print("==========================================")


# =========================================================
# RUN
# =========================================================

if __name__ == "__main__":
    main()
