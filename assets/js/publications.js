/* =========================================================
   PUBLICATIONS
   Automatically loaded from:
   data/cv/publications.json
========================================================= */

let publications = [];


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

    const data = await response.json();

    const articles =
      Array.isArray(
        data.peer_reviewed_journal_articles
      )
        ? data.peer_reviewed_journal_articles
        : [];


    /*
     * Convert the CV extraction format into the
     * display format used by the website.
     */

    publications = articles.map(
      article => {

        const citation =
          String(
            article.citation || ""
          ).trim();

        const year =
          Number(article.year) || "";

        const doi =
          String(
            article.doi || ""
          ).trim();


        const title =
          extractPublicationTitle(
            citation
          );


        const journal =
          extractJournal(
            citation
          );


        const quartile =
          extractQuartile(
            citation
          );


        const impactFactor =
          extractImpactFactor(
            citation
          );


        /*
         * The current CV JSON does not yet contain
         * a dedicated JCR year field.
         *
         * For now, use the publication year as a
         * fallback. This will be refined later when
         * the Python extractor is upgraded.
         */

        const metricYear =
          extractMetricYear(
            citation
          ) || "";


        const category =
          determinePublicationCategory(
            title,
            citation
          );


        return {

          year,

          category,

          title,

          journal,

          quartile,

          impactFactor,

          metricYear,

          doi,

          citation

        };

      }
    );


    /*
     * Remove accidental empty records.
     */

    publications =
      publications.filter(
        publication =>
          publication.title ||
          publication.citation
      );


    console.log(
      `✓ Publications loaded from CV: ${publications.length}`
    );


    /*
     * Validate against the article count generated
     * by the Python CV extraction script.
     */

    if (
      Number.isFinite(
        Number(data.article_count)
      ) &&
      Number(data.article_count) !==
        publications.length
    ) {

      console.warn(
        `Publication count mismatch: JSON reports ${data.article_count}, ` +
        `but ${publications.length} records were loaded.`
      );

    } else {

      console.log(
        `✓ Publication validation PASSED: ${publications.length} articles detected.`
      );

    }


    /*
     * Initialize the publication interface only
     * after the data has successfully loaded.
     */

    setupPublicationFilters();
    renderPublications();


  } catch (error) {

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
            Please try refreshing the page.
          </p>

        </div>

      `;

    }

  }

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
   * First remove the DOI and trailing metadata.
   */

  let text =
    citation
      .replace(
        /\s*https:\/\/doi\.org\/\S+/gi,
        ""
      )
      .trim();


  /*
   * Remove quartile / IF information.
   */

  text =
    text.replace(
      /\s*\(Q[1-4][^)]*\)\.?\s*$/i,
      ""
    );


  /*
   * Find the year and take everything after it.
   */

  const yearMatch =
    text.match(
      /\(\d{4}\)\.\s*/
    );


  if (!yearMatch) {
    return text;
  }


  text =
    text.substring(
      yearMatch.index +
      yearMatch[0].length
    );


  /*
   * Known journal names appearing in the CV.
   *
   * This helps separate article titles from
   * journal names without needing manual entry.
   */

  const journals = [

    "Journal of Environmental Chemical Engineering",

    "ACS Applied Nano Materials",

    "Microchemical Journal",

    "Talanta",

    "Materials Today Chemistry",

    "ACS Omega",

    "Electrochimica Acta",

    "Food Chemistry",

    "Journal of The Electrochemical Society",

    "Journal of Electroanalytical Chemistry",

    "Bhutan Journal of Research and Development"

  ];


  let journalPosition = -1;


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


  if (journalPosition !== -1) {

    text =
      text.substring(
        0,
        journalPosition
      );

  }


  /*
   * Clean trailing punctuation.
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

    "ACS Applied Nano Materials",

    "Microchemical Journal",

    "Talanta",

    "Materials Today Chemistry",

    "ACS Omega",

    "Electrochimica Acta",

    "Food Chemistry",

    "Journal of The Electrochemical Society",

    "Journal of Electroanalytical Chemistry",

    "Bhutan Journal of Research and Development"

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

  /*
   * At present, the CV citation does not explicitly
   * identify the JCR year separately.
   *
   * This function is intentionally prepared so the
   * Python extractor can later provide it.
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
   * Forensic electrochemistry
   */

  if (
    /forensic|clonazepam|diazepam|xylazine|promethazine|fingerprint/.test(
      text
    )
  ) {

    return "Forensic Electrochemistry";

  }


  /*
   * Food analysis
   */

  if (
    /food|turmeric|curcumin|adulterant|animal feed|food supplements/.test(
      text
    )
  ) {

    return "Food Analysis";

  }


  /*
   * Biomedical / biosensors
   */

  if (
    /glucose|uric acid|flutamide|biosensor|blood serum|ammonium ion|skin patch/.test(
      text
    )
  ) {

    return "Biomedical / Biosensors";

  }


  /*
   * Environmental monitoring
   */

  if (
    /water|chlorine|nitrate|nitrite|mercury|cadmium|lead|zinc|hydroquinone/.test(
      text
    )
  ) {

    return "Environmental Monitoring";

  }


  /*
   * Sustainable nanomaterials
   */

  if (
    /laser-induced graphene|graphene|carbon nanotube|nanocomposite|nanoparticle|porous carbon/.test(
      text
    )
  ) {

    return "Sustainable Nanomaterials";

  }


  /*
   * Electrocatalysis
   */

  if (
    /methanol oxidation|electrocatalyst/.test(
      text
    )
  ) {

    return "Electrocatalysis";

  }


  return "Electrochemical Research";

}


/* =========================================================
   PUBLICATION UTILITIES
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

    } else if (publicationList) {

      publicationList.parentNode.insertBefore(
        counter,
        publicationList
      );

    } else {

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


  if (showing === total) {

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

  } else {

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
   * Prevent duplicate controls if this function
   * is accidentally called more than once.
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

    } else {

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
     CATEGORIES
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
     EVENTS
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
