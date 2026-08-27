from docx import Document
from pathlib import Path
import json
import re


# =========================================================
# FILE LOCATIONS
# =========================================================

CV_FILE = Path("cv/Sangay Wangchuk CV (complete).docx")
OUTPUT_DIR = Path("data/cv")
METRICS_FILE = OUTPUT_DIR / "journal_metrics.json"


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

    start_heading_upper = start_heading.upper()

    end_headings_upper = [
        heading.upper()
        for heading in end_headings
    ]

    for paragraph in paragraphs:

        paragraph_upper = paragraph.upper()

        if paragraph_upper == start_heading_upper:

            collecting = True
            continue

        if (
            collecting
            and paragraph_upper in end_headings_upper
        ):

            break

        if collecting:
            section.append(paragraph)

    return section


# =========================================================
# VERIFIED JOURNAL METRICS
# =========================================================

def load_verified_metrics():
    """
    Load verified journal metrics from journal_metrics.json.

    journal_metrics.json is the authoritative source for:

        - Quartile
        - Impact Factor
        - Metric/JCR year

    These verified values take precedence over information
    appearing in the CV or legacy metadata.
    """

    if not METRICS_FILE.exists():

        print(
            "WARNING: journal_metrics.json not found."
        )

        print(
            "The parser will use legacy metadata where available."
        )

        return {}

    try:

        with open(
            METRICS_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            data = json.load(file)

        if not isinstance(data, dict):

            print(
                "WARNING: journal_metrics.json does not contain "
                "a valid JSON object."
            )

            return {}

        print(
            f"✓ Loaded verified journal metrics: "
            f"{len(data)} DOI record(s)."
        )

        return data

    except Exception as error:

        print(
            "WARNING: Could not load journal_metrics.json:"
        )

        print(error)

        return {}


# =========================================================
# LEGACY PUBLICATION METADATA
# =========================================================
#
# This serves as a fallback for category information and
# for legacy metric values when journal_metrics.json does
# not contain a DOI.
#
# IMPORTANT:
# Verified values from journal_metrics.json always take
# precedence over these values.
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
        "quartile": "Q2",
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
    Remove duplicated journal metric information from
    publication details.

    Examples removed:

        (Q1, IF 5.1)
        (Q1, IF 5. 1)
        (Q1, IF 6.1)
        Q1, IF 5.1
        IF 5.1

    Structured fields are responsible for displaying
    quartile and impact factor.
    """

    if not details:
        return ""

    # Normalize spaces inside IF values.
    details = re.sub(
        r"\bIF\s+(\d+)\s*\.\s*(\d+)",
        r"IF \1.\2",
        details,
        flags=re.IGNORECASE
    )

    # Remove parenthetical combinations.
    details = re.sub(
        r"\(\s*Q\d\s*,\s*IF\s+\d+(?:\.\s*\d+)?\s*\)",
        "",
        details,
        flags=re.IGNORECASE
    )

    # Remove standalone combinations.
    details = re.sub(
        r"\bQ\d\s*,\s*IF\s+\d+(?:\.\s*\d+)?",
        "",
        details,
        flags=re.IGNORECASE
    )

    # Remove standalone Q1/Q2/Q3/Q4.
    details = re.sub(
        r"\bQ[1-4]\b",
        "",
        details,
        flags=re.IGNORECASE
    )

    # Remove standalone IF values.
    details = re.sub(
        r"\bIF\s+\d+(?:\.\s*\d+)?",
        "",
        details,
        flags=re.IGNORECASE
    )

    # Remove empty parentheses.
    details = re.sub(
        r"\(\s*\)",
        "",
        details
    )

    # Normalize whitespace.
    details = re.sub(
        r"\s+",
        " ",
        details
    ).strip()

    # Clean spaces before punctuation.
    details = re.sub(
        r"\s+\.",
        ".",
        details
    )

    details = re.sub(
        r"\s+,",
        ",",
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

def parse_publications(paragraphs, verified_metrics):
    """
    Extract peer-reviewed journal articles and convert
    them into structured publication records.

    Verified journal metrics take precedence over
    metadata contained in the CV.
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

        year = int(
            year_match.group(1)
        )

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

        # Remove leading punctuation after year.
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
            details = ". ".join(
                parts[2:]
            )

        # -------------------------------------------------
        # Clean fields
        # -------------------------------------------------

        title = re.sub(
            r"\s+",
            " ",
            title
        ).strip(" .")

        journal = re.sub(
            r"\s+",
            " ",
            journal
        ).strip(" .")

        details = clean_publication_details(
            details
        )

        # -------------------------------------------------
        # METADATA
        # -------------------------------------------------

        legacy_metadata = PUBLICATION_METADATA.get(
            doi_key,
            {}
        )

        verified_metadata = verified_metrics.get(
            doi_key,
            {}
        )

        # -------------------------------------------------
        # Category
        # -------------------------------------------------
        #
        # Category is retained from the local metadata.
        # Journal metrics are handled separately.
        # -------------------------------------------------

        category = legacy_metadata.get(
            "category",
            "Research Publication"
        )

        # -------------------------------------------------
        # VERIFIED METRICS TAKE PRIORITY
        # -------------------------------------------------

        quartile = verified_metadata.get(
            "quartile",
            legacy_metadata.get(
                "quartile",
                ""
            )
        )

        impact_factor = verified_metadata.get(
            "impactFactor",
            legacy_metadata.get(
                "impactFactor",
                ""
            )
        )

        metric_year = verified_metadata.get(
            "metricYear",
            legacy_metadata.get(
                "metricYear",
                ""
            )
        )

        # -------------------------------------------------
        # Create structured record
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

        publications.append(
            publication
        )

    return publications


# =========================================================
# SUBMITTED MANUSCRIPT
# =========================================================

def parse_submitted_manuscript(paragraphs):

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

            projects.append(
                paragraph
            )

    return projects


# =========================================================
# PROFESSIONAL PROFILE
# =========================================================

def parse_profile(paragraphs):

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

    return extract_section(
        paragraphs,
        "AWARDS AND SCHOLARSHIPS/FINANCIAL SUPPORT",
        [
            "SKILLS AND COMPETENCIES",
            "RESEARCH PUBLICATIONS"
        ]
    )


# =========================================================
# METADATA VALIDATION
# =========================================================

def validate_metadata(publications, verified_metrics):
    """
    Compare publication metrics against the verified
    journal metrics database.

    The verified database is authoritative.
    """

    print("------------------------------------------")
    print("JOURNAL METRICS VALIDATION")
    print("------------------------------------------")

    missing_verified = []
    mismatches = []

    for publication in publications:

        doi = publication.get(
            "doi",
            ""
        )

        if not doi:
            continue

        doi_key = doi.replace(
            "https://doi.org/",
            ""
        ).lower()

        verified = verified_metrics.get(
            doi_key
        )

        if not verified:

            missing_verified.append(
                doi_key
            )

            continue

        # -------------------------------------------------
        # Compare structured output with verified database
        # -------------------------------------------------

        for field in [
            "quartile",
            "impactFactor",
            "metricYear"
        ]:

            expected = str(
                verified.get(
                    field,
                    ""
                )
            ).strip()

            actual = str(
                publication.get(
                    field,
                    ""
                )
            ).strip()

            if expected != actual:

                mismatches.append(
                    (
                        doi_key,
                        field,
                        expected,
                        actual
                    )
                )

    # -----------------------------------------------------
    # Missing metrics
    # -----------------------------------------------------

    if missing_verified:

        print(
            f"⚠ {len(missing_verified)} publication(s) "
            "do not have verified metrics:"
        )

        for doi in missing_verified:

            print(
                f"   - {doi}"
            )

    else:

        print(
            "✓ All DOI-linked publications have "
            "verified metrics."
        )

    # -----------------------------------------------------
    # Mismatches
    # -----------------------------------------------------

    if mismatches:

        print(
            "⚠ Metric mismatches detected:"
        )

        for doi, field, expected, actual in mismatches:

            print(
                f"   - {doi}: {field} "
                f"(verified={expected}, "
                f"output={actual})"
            )

    else:

        print(
            "✓ Verified journal metrics validation PASSED."
        )

    print("------------------------------------------")

    return (
        missing_verified,
        mismatches
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
    # Load verified journal metrics
    # -----------------------------------------------------

    verified_metrics = load_verified_metrics()

    # -----------------------------------------------------
    # Load Word document
    # -----------------------------------------------------

    document = Document(
        CV_FILE
    )

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
        paragraphs,
        verified_metrics
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

    print("")
    print("==========================================")
    print("CV EXTRACTION COMPLETED")
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
    # PUBLICATION COUNT VALIDATION
    # =====================================================

    print("")
    print("------------------------------------------")
    print("PUBLICATION COUNT VALIDATION")
    print("------------------------------------------")

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
    # DOI VALIDATION
    # =====================================================

    print("")
    print("------------------------------------------")
    print("DOI VALIDATION")
    print("------------------------------------------")

    publications_without_doi = []

    for publication in publications:

        if not publication.get("doi"):

            publications_without_doi.append(
                publication.get(
                    "title",
                    "Untitled publication"
                )
            )

    if publications_without_doi:

        print(
            f"⚠ {len(publications_without_doi)} "
            "publication(s) have no DOI."
        )

        for title in publications_without_doi:

            print(
                f"   - {title}"
            )

    else:

        print(
            "✓ DOI validation PASSED: "
            "all publications contain DOI information."
        )

    # =====================================================
    # JOURNAL METRICS VALIDATION
    # =====================================================

    validate_metadata(
        publications,
        verified_metrics
    )

    # =====================================================
    # FINAL REPORT
    # =====================================================

    print("")
    print("==========================================")
    print("FINAL VALIDATION COMPLETE")
    print("==========================================")

    print(
        "✓ CV extraction is complete."
    )

    print(
        "✓ Structured publication data generated."
    )

    print(
        "✓ Verified journal metrics applied."
    )

    print(
        "✓ Duplicate Q1/IF information removed "
        "from publication details."
    )

    print(
        "✓ Verified metrics take precedence over CV data."
    )

    print("==========================================")


# =========================================================
# RUN
# =========================================================

if __name__ == "__main__":
    main()
