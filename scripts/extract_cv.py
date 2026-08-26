from docx import Document
from pathlib import Path
import json
import re


CV_FILE = Path("cv/Sangay Wangchuk CV (complete).docx")
OUTPUT_DIR = Path("data/cv")


def clean_text(text):
    """Clean unnecessary spaces while preserving the actual CV content."""
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def extract_paragraphs(document):
    """Extract non-empty paragraphs from the Word document."""
    paragraphs = []

    for paragraph in document.paragraphs:
        text = clean_text(paragraph.text)

        if text:
            paragraphs.append(text)

    return paragraphs


def extract_tables(document):
    """Extract table contents from the Word document."""
    tables = []

    for table in document.tables:
        rows = []

        for row in table.rows:
            cells = [clean_text(cell.text) for cell in row.cells]
            rows.append(cells)

        if rows:
            tables.append(rows)

    return tables


def main():
    if not CV_FILE.exists():
        raise FileNotFoundError(
            f"CV file not found: {CV_FILE}"
        )

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    document = Document(CV_FILE)

    paragraphs = extract_paragraphs(document)
    tables = extract_tables(document)

    # Save the complete extracted CV text.
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

    print("CV extraction completed successfully.")
    print(f"Paragraphs extracted: {len(paragraphs)}")
    print(f"Tables extracted: {len(tables)}")


if __name__ == "__main__":
    main()
