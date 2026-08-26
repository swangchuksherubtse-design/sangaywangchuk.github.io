/* =========================================================
   PUBLICATIONS
   =========================================================
   Automatically loaded from:
   data/cv/publications.json

   IMPORTANT:
   - Do NOT manually enter publications here.
   - The CV → JSON extraction is the source of truth.
   - When publications.json changes, this section updates
     automatically after the website reloads.
========================================================= */


/* =========================================================
   GLOBAL PUBLICATION DATA
========================================================= */

let publications = [];

let publicationFiltersInitialized = false;


/* =========================================================
   PUBLICATION DATA SOURCE
========================================================= */

const PUBLICATIONS_DATA_URL =
  "data/cv/publications.json";


/* =========================================================
   LOAD PUBLICATIONS FROM CV JSON
========================================================= */

async function loadPublications() {

  try {

    const response = await fetch(
      PUBLICATIONS_DATA_URL,
      {
        cache: "no-store"
      }
    );


    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}: Unable to load publication data.`
      );

    }


    const data =
      await response.json();


    /*
     * The Python CV extractor stores the journal articles
     * inside:
     *
     * peer_reviewed_journal_articles
     */

    const articles =
      Array.isArray(
        data.peer_reviewed_journal_articles
      )
        ? data.peer_reviewed_journal_articles
        : [];


    /*
     * Convert extracted CV records into the format
     * required by the website.
     */

    publications =
      articles
        .map(
          article => {

            const citation =
              String(
                article.citation || ""
              ).trim();


            const year =
              Number(article.year) ||
              extractPublicationYear(
                citation
              ) ||
              "";


            const doi =
              String(
                article.doi || ""
              ).trim();


            /*
             * If the extractor is upgraded in the future
             * to provide these fields directly, the website
             * will use them automatically.
             */

            const title =
              String(
                article.title ||
                extractPublicationTitle(
                  citation
                ) ||
                ""
              ).trim();


            const journal =
              String(
                article.journal ||
                extractJournal(
                  citation
                ) ||
                ""
              ).trim();


            const quartile =
              String(
                article.quartile ||
                extractQuartile(
                  citation
                ) ||
                ""
              ).trim();


            const impactFactor =
              String(
                article.impactFactor ||
                extractImpactFactor(
                  citation
                ) ||
                ""
              ).trim();


            const metricYear =
              String(
                article.metricYear ||
                extractMetricYear(
                  citation
                ) ||
                ""
              ).trim();


            const details =
              String(
                article.details ||
                extractPublicationDetails(
                  citation,
                  journal
                ) ||
                ""
              ).trim();


            const category =
              String(
                article.category ||
                determinePublicationCategory(
                  title,
                  citation
                ) ||
                "Electrochemical Research"
              ).trim();


            return {

              year,

              category,

              title,

              journal,

              quartile,

              impactFactor,

              metricYear,

              details,

              doi,

              citation

            };

          }
        )


        /*
         * Remove records that contain no useful
         * publication information.
         */

        .filter(
          publication =>
            publication.title ||
            publication.citation
        );


    /* =====================================================
       VALIDATION
    ===================================================== */

    console.log(
      "=========================================="
    );

    console.log(
      `✓ Publications loaded from CV JSON: ${publications.length}`
    );


    if (
      Number.isFinite(
        Number(data.article_count)
      )
    ) {

      const expected =
        Number(
          data.article_count
        );


      if (
        expected ===
        publications.length
      ) {

        console.log(
          `✓ Publication validation PASSED: ${publications.length} articles detected.`
        );

      } else {

        console.warn(
          `⚠ Publication count mismatch: JSON reports ${expected}, ` +
          `but ${publications.length} records were loaded.`
        );

      }

    }


    console.log(
      "=========================================="
    );


    /*
     * Initialize the interface only after the
     * publication data has successfully loaded.
     */

    setupPublicationFilters();

    renderPublications();


  }

  catch (error) {

    console.error(
      "Publication data loading failed:",
      error
    );


    const container =
      document.querySelector(
        ".pub-list"
      );


    if (container) {

      container.innerHTML = `

        <div class="publication-empty">

          <h3>
            Unable to load publications
          </h3>

          <p>
            Publication data could not be loaded
            from the CV database.
          </p>

          <p>
            Please check that
            <strong>data/cv/publications.json</strong>
            exists in the website repository.
          </p>

        </div>

      `;

    }

  }

}


/* =========================================================
   EXTRACT PUBLICATION YEAR
========================================================= */

function extractPublicationYear(
  citation
) {

  if (!citation) {
    return "";
  }


  const match =
    citation.match(
      /\((20\d{2})\)/
    );


  return match
    ? Number(match[1])
    : "";

}


/* =========================================================
   EXTRACT PUBLICATION TITLE
========================================================= */

function extractPublicationTitle(
  citation
) {

  if (!citation) {
    return "";
  }


  /*
   * Remove DOI.
   */

  let text =
    citation
      .replace(
        /\s*https:\/\/doi\.org\/\S+/gi,
        ""
      )
      .trim();


  /*
   * Remove final journal metadata such as:
   *
   * (Q1, IF 5.1)
   */

  text =
    text.replace(
      /\s*\(Q[1-4][^)]*\)\.?\s*$/i,
      ""
    );


  /*
   * Find the publication year.
   */

  const yearMatch =
    text.match(
      /\((20\d{2})\)\.\s*/
    );


  if (!yearMatch) {
    return text;
  }


  /*
   * Everything after the year is:
   *
   * Title. Journal, volume...
   */

  text =
    text.substring(
      yearMatch.index +
      yearMatch[0].length
    );


  /*
   * Known journals in the CV.
   *
   * Longest/specific names are included first.
   */

  const journals = [

    "Journal of Environmental Chemical Engineering",

    "Journal of The Electrochemical Society",

    "Journal of Electroanalytical Chemistry",

    "Bhutan Journal of Research and Development",

    "ACS Applied Nano Materials",

    "Materials Today Chemistry",

    "Microchemical Journal",

    "Electrochimica Acta",

    "Food Chemistry",

    "ACS Omega",

    "Talanta"

  ];


  let journalPosition =
    -1;


  journals.forEach(
    journal => {

      const position =
        text
          .toLowerCase()
          .indexOf(
            journal.toLowerCase()
          );


      if (
        position !== -1 &&
        (
          journalPosition === -1 ||
          position < journalPosition
        )
      ) {

        journalPosition =
          position;

      }

    }
  );


  if (
    journalPosition !== -1
  ) {

    text =
      text.substring(
        0,
        journalPosition
      );

  }


  /*
   * Remove trailing punctuation.
   */

  text =
    text
      .replace(
        /[\s.]+$/,
        ""
      )
      .trim();


  return text;

}


/* =========================================================
   EXTRACT JOURNAL
========================================================= */

function extractJournal(
  citation
) {

  if (!citation) {
    return "";
  }


  const journals = [

    "Journal of Environmental Chemical Engineering",

    "Journal of The Electrochemical Society",

    "Journal of Electroanalytical Chemistry",

    "Bhutan Journal of Research and Development",

    "ACS Applied Nano Materials",

    "Materials Today Chemistry",

    "Microchemical Journal",

    "Electrochimica Acta",

    "Food Chemistry",

    "ACS Omega",

    "Talanta"

  ];


  const lowerCitation =
    citation.toLowerCase();


  for (
    const journal of journals
  ) {

    if (
      lowerCitation.includes(
        journal.toLowerCase()
      )
    ) {

      return journal;

    }

  }


  return "";

}


/* =========================================================
   EXTRACT QUARTILE
========================================================= */

function extractQuartile(
  citation
) {

  if (!citation) {
    return "";
  }


  const match =
    citation.match(
      /\((Q[1-4])\b/i
    );


  return match
    ? match[1].toUpperCase()
    : "";

}


/* =========================================================
   EXTRACT IMPACT FACTOR
========================================================= */

function extractImpactFactor(
  citation
) {

  if (!citation) {
    return "";
  }


  const match =
    citation.match(
      /IF\s*([0-9]+(?:\.[0-9]+)?)/i
    );


  return match
    ? match[1]
    : "";

}


/* =========================================================
   EXTRACT JCR / METRIC YEAR
========================================================= */

function extractMetricYear(
  citation
) {

  if (!citation) {
    return "";
  }


  /*
   * Looks for explicit references such as:
   *
   * JCR 2024
   * JCR year: 2024
   * JCR Year - 2024
   */

  const match =
    citation.match(
      /JCR\s*(?:year)?\s*[:\-]?\s*(20\d{2})/i
    );


  return match
    ? match[1]
    : "";

}


/* =========================================================
   EXTRACT ADDITIONAL PUBLICATION DETAILS
========================================================= */

function extractPublicationDetails(
  citation,
  journal
) {

  if (!citation) {
    return "";
  }


  /*
   * The website currently does not need to display
   * volume/page information separately because the
   * citation itself is retained.
   *
   * However, Bhutan Journal of Research and Development
   * currently contains:
   *
   * 11(1)
   *
   * so preserve this when detected.
   */

  if (
    journal ===
    "Bhutan Journal of Research and Development"
  ) {

    const match =
      citation.match(
        /,\s*(\d+\(\d+\))/
      );


    if (match) {
      return match[1];
    }

  }


  return "";

}


/* =========================================================
   DETERMINE RESEARCH CATEGORY
========================================================= */

function determinePublicationCategory(
  title,
  citation
) {

  const text =
    `${title} ${citation}`
      .toLowerCase();


  /*
   * -------------------------------------------------------
   * FORENSIC ELECTROCHEMISTRY
   * -------------------------------------------------------
   */

  if (
    /forensic|clonazepam|diazepam|xylazine|promethazine|fingerprint/.test(
      text
    )
  ) {

    return "Forensic Electrochemistry";

  }


  /*
   * -------------------------------------------------------
   * FOOD ANALYSIS
   * -------------------------------------------------------
   */

  if (
    /food|turmeric|curcumin|adulterant|animal feed|food supplement/.test(
      text
    )
  ) {

    return "Food Analysis";

  }


  /*
   * -------------------------------------------------------
   * BIOMEDICAL / BIOSENSORS
   * -------------------------------------------------------
   */

  if (
    /glucose|uric acid|flutamide|biosensor|blood serum|ammonium ion|skin patch/.test(
      text
    )
  ) {

    return "Biomedical / Biosensors";

  }


  /*
   * -------------------------------------------------------
   * ENVIRONMENTAL MONITORING
   * -------------------------------------------------------
   */

  if (
    /water|chlorine|nitrate|nitrite|mercury|cadmium|lead|zinc|hydroquinone/.test(
      text
    )
  ) {

    return "Environmental Monitoring";

  }


  /*
   * -------------------------------------------------------
   * SUSTAINABLE NANOMATERIALS
   * -------------------------------------------------------
   */

  if (
    /laser-induced graphene|graphene|carbon nanotube|nanocomposite|nanoparticle|porous carbon|biomass/.test(
      text
    )
  ) {

    return "Sustainable Nanomaterials";

  }


  /*
   * -------------------------------------------------------
   * ELECTROCATALYSIS
   * -------------------------------------------------------
   */

  if (
    /methanol oxidation|electrocatalyst/.test(
      text
    )
  ) {

    return "Electrocatalysis";

  }


  /*
   * -------------------------------------------------------
   * DEFAULT
   * -------------------------------------------------------
   */

  return "Electrochemical Research";

}


/* =========================================================
   PUBLICATION YEAR RANGE
========================================================= */

function getPublicationYears() {

  const years =
    publications

      .map(
        pub =>
          Number(pub.year)
      )

      .filter(
        year =>
          Number.isFinite(year)
      );


  if (!years.length) {

    return {

      newest: "",

      oldest: ""

    };

  }


  return {

    newest:
      Math.max(...years),

    oldest:
      Math.min(...years)

  };

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
  value
) {

  return String(
    value ?? ""
  )

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================================
   PUBLICATION DETAILS
========================================================= */

function getPublicationDetails(
  pub
) {

  const parts = [];


  if (pub.quartile) {

    parts.push(
      escapeHTML(
        pub.quartile
      )
    );

  }


  if (pub.impactFactor) {

    let impactText =
      `IF ${pub.impactFactor}`;


    if (pub.metricYear) {

      impactText +=
        ` (JCR ${pub.metricYear})`;

    }


    parts.push(
      escapeHTML(
        impactText
      )
    );

  }


  if (pub.details) {

    parts.push(
      escapeHTML(
        pub.details
      )
    );

  }


  return parts.join(
    " · "
  );

}


/* =========================================================
   PUBLICATION COUNT
========================================================= */

function updatePublicationCount(
  list = publications
) {

  const section =
    document.querySelector(
      "#publications"
    );


  if (!section) {
    return;
  }


  let counter =
    section.querySelector(
      ".publication-count"
    );


  if (!counter) {

    counter =
      document.createElement(
        "div"
      );


    counter.className =
      "publication-count";


    const controls =
      section.querySelector(
        ".publication-controls"
      );


    const publicationList =
      section.querySelector(
        ".pub-list"
      );


    if (controls) {

      controls.parentNode.insertBefore(
        counter,
        controls
      );

    }

    else if (publicationList) {

      publicationList.parentNode.insertBefore(
        counter,
        publicationList
      );

    }

    else {

      section.appendChild(
        counter
      );

    }

  }


  const total =
    publications.length;


  const showing =
    list.length;


  const {
    newest,
    oldest
  } =
    getPublicationYears();


  if (
    showing === total
  ) {

    counter.innerHTML = `

      <div>

        <strong>
          ${total} Publications
        </strong>

      </div>

      <span>
        Peer-reviewed research articles
        · ${oldest}–${newest}
      </span>

    `;

  }

  else {

    counter.innerHTML = `

      <div>

        <strong>
          Showing ${showing}
          of ${total} Publications
        </strong>

      </div>

      <span>
        Filtered research results
      </span>

    `;

  }

}


/* =========================================================
   RENDER PUBLICATIONS
========================================================= */

function renderPublications(
  list = publications
) {

  const container =
    document.querySelector(
      ".pub-list"
    );


  if (!container) {
    return;
  }


  const sortedList =
    [...list].sort(
      (a, b) => {

        const yearDifference =
          Number(b.year) -
          Number(a.year);


        if (
          yearDifference !== 0
        ) {

          return yearDifference;

        }


        return (
          a.title || ""
        ).localeCompare(
          b.title || ""
        );

      }
    );


  updatePublicationCount(
    sortedList
  );


  if (
    sortedList.length === 0
  ) {

    container.innerHTML = `

      <div
        class="publication-empty"
      >

        <h3>
          No publications found
        </h3>

        <p>
          Try another search term,
          year, or research area.
        </p>

      </div>

    `;

    return;

  }


  container.innerHTML =
    sortedList

      .map(
        (pub, index) => {

          const title =
            escapeHTML(
              pub.title
            );


          const journal =
            escapeHTML(
              pub.journal
            );


          const category =
            escapeHTML(
              pub.category
            );


          const year =
            escapeHTML(
              pub.year
            );


          const details =
            getPublicationDetails(
              pub
            );


          return `

            <article
              class="publication-item"
              data-year="${year}"
              data-category="${category}"
            >

              <div
                class="publication-number"
                aria-hidden="true"
              >

                ${String(
                  index + 1
                ).padStart(
                  2,
                  "0"
                )}

              </div>


              <div
                class="publication-content"
              >

                <div
                  class="publication-meta"
                >

                  <span>
                    ${year}
                  </span>


                  ${
                    category
                      ? `
                        <span>
                          ${category}
                        </span>
                      `
                      : ""
                  }


                  ${
                    details
                      ? `
                        <span>
                          ${details}
                        </span>
                      `
                      : ""
                  }

                </div>


                <h3>
                  ${title}
                </h3>


                ${
                  journal
                    ? `
                      <p
                        class="publication-journal"
                      >
                        ${journal}
                      </p>
                    `
                    : ""
                }


                ${
                  pub.doi
                    ? `

                      <a
                        class="publication-doi"
                        href="${escapeHTML(
                          pub.doi
                        )}"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open DOI for ${title}"
                      >
                        View DOI →
                      </a>

                    `
                    : `

                      <span
                        class="publication-doi"
                        aria-disabled="true"
                      >
                        DOI unavailable
                      </span>

                    `
                }

              </div>

            </article>

          `;

        }
      )

      .join("");

}


/* =========================================================
   PUBLICATION FILTERS
========================================================= */

function setupPublicationFilters() {

  /*
   * Prevent duplicate event listeners if this function
   * is called more than once.
   */

  if (
    publicationFiltersInitialized
  ) {

    return;

  }


  const section =
    document.querySelector(
      "#publications"
    );


  if (!section) {
    return;
  }


  let controls =
    section.querySelector(
      ".publication-controls"
    );


  /*
   * Create controls only if they do not already
   * exist in the HTML.
   */

  if (!controls) {

    controls =
      document.createElement(
        "div"
      );


    controls.className =
      "publication-controls";


    controls.innerHTML = `

      <div
        class="publication-search-wrap"
      >

        <label
          for="publication-search"
          class="sr-only"
        >
          Search publications
        </label>


        <input
          type="search"
          id="publication-search"
          placeholder="Search publications..."
          aria-label="Search publications"
          autocomplete="off"
        >

      </div>


      <div
        class="publication-filter-wrap"
      >

        <label
          for="publication-year"
          class="sr-only"
        >
          Filter by year
        </label>


        <select
          id="publication-year"
          aria-label="Filter publications by year"
        >

          <option value="all">
            All years
          </option>

        </select>


        <label
          for="publication-category"
          class="sr-only"
        >
          Filter by research area
        </label>


        <select
          id="publication-category"
          aria-label="Filter publications by research area"
        >

          <option value="all">
            All research areas
          </option>

        </select>


        <button
          type="button"
          id="publication-reset"
          class="publication-reset"
        >
          Reset
        </button>

      </div>

    `;


    const publicationList =
      section.querySelector(
        ".pub-list"
      );


    if (publicationList) {

      publicationList.parentNode.insertBefore(
        controls,
        publicationList
      );

    }

    else {

      section.appendChild(
        controls
      );

    }

  }


  const search =
    controls.querySelector(
      "#publication-search"
    );


  const yearSelect =
    controls.querySelector(
      "#publication-year"
    );


  const categorySelect =
    controls.querySelector(
      "#publication-category"
    );


  const resetButton =
    controls.querySelector(
      "#publication-reset"
    );


  if (
    !search ||
    !yearSelect ||
    !categorySelect
  ) {

    return;

  }


  /* =======================================================
     YEARS
  ======================================================= */

  const years =
    [
      ...new Set(
        publications

          .map(
            pub =>
              Number(pub.year)
          )

          .filter(
            year =>
              Number.isFinite(
                year
              )
          )
      )
    ]

      .sort(
        (a, b) =>
          b - a
      );


  years.forEach(
    year => {

      const value =
        String(year);


      if (
        ![
          ...yearSelect.options
        ].some(
          option =>
            option.value ===
            value
        )
      ) {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          value;


        option.textContent =
          value;


        yearSelect.appendChild(
          option
        );

      }

    }
  );


  /* =======================================================
     RESEARCH CATEGORIES
  ======================================================= */

  const categories =
    [
      ...new Set(
        publications

          .map(
            pub =>
              pub.category
          )

          .filter(Boolean)
      )
    ]

      .sort(
        (a, b) =>
          a.localeCompare(b)
      );


  categories.forEach(
    category => {

      if (
        ![
          ...categorySelect.options
        ].some(
          option =>
            option.value ===
            category
        )
      ) {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          category;


        option.textContent =
          category;


        categorySelect.appendChild(
          option
        );

      }

    }
  );


  /* =======================================================
     FILTER FUNCTION
  ======================================================= */

  function filterPublications() {

    const searchTerms =
      search.value

        .toLowerCase()

        .trim()

        .split(/\s+/)

        .filter(Boolean);


    const selectedYear =
      yearSelect.value;


    const selectedCategory =
      categorySelect.value;


    const filtered =
      publications.filter(
        pub => {

          /*
           * Search across all useful publication fields,
           * including the complete CV citation.
           */

          const searchableText = [

            pub.title,

            pub.journal,

            pub.category,

            pub.year,

            pub.quartile,

            pub.impactFactor,

            pub.metricYear,

            pub.details,

            pub.citation

          ]

            .filter(Boolean)

            .join(" ")

            .toLowerCase();


          const matchesSearch =

            searchTerms.length === 0 ||

            searchTerms.every(
              term =>
                searchableText.includes(
                  term
                )
            );


          const matchesYear =

            selectedYear === "all" ||

            String(pub.year) ===
              selectedYear;


          const matchesCategory =

            selectedCategory === "all" ||

            pub.category ===
              selectedCategory;


          return (

            matchesSearch &&

            matchesYear &&

            matchesCategory

          );

        }
      );


    renderPublications(
      filtered
    );

  }


  /* =======================================================
     EVENT LISTENERS
  ======================================================= */

  search.addEventListener(
    "input",
    filterPublications
  );


  yearSelect.addEventListener(
    "change",
    filterPublications
  );


  categorySelect.addEventListener(
    "change",
    filterPublications
  );


  if (resetButton) {

    resetButton.addEventListener(
      "click",
      () => {

        search.value =
          "";

        yearSelect.value =
          "all";

        categorySelect.value =
          "all";


        filterPublications();


        search.focus();

      }
    );

  }


  publicationFiltersInitialized =
    true;

}


/* =========================================================
   INITIALIZE PUBLICATIONS
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadPublications();

  }
);
