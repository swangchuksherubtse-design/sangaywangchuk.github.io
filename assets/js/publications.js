```javascript
const publications = [
  {
    year: 2026,
    category: "Environmental Monitoring",
    title: "A smartphone-assisted NFC-enabled microfluidic electrochemical sensor for on-site monitoring of residual free chlorine in water.",
    journal: "Journal of Environmental Chemical Engineering",
    quartile: "Q1",
    impactFactor: "7.5",
    metricYear: "2025",
    doi: "https://doi.org/10.1016/j.jece.2026.123838"
  },

  {
    year: 2026,
    category: "Biomedical / Wearable Sensors",
    title: "Ammonium Ion-Sensing Skin Patch Based on Three-Dimensional Nanoarchitecture of Polystyrenesulfonate:Polyaniline/Copper Microflowers Deposited on Flexible Graphene Electrodes.",
    journal: "ACS Applied Nano Materials",
    quartile: "Q1",
    impactFactor: "5.5",
    metricYear: "2024",
    doi: "https://doi.org/10.1021/acsanm.5c05854"
  },

  {
    year: 2026,
    category: "Forensic Electrochemistry",
    title: "Electrochemical clonazepam sensor based on B-doped laser-induced graphene for on-site forensic analysis.",
    journal: "Microchemical Journal",
    quartile: "Q1",
    impactFactor: "5.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.microc.2026.117476"
  },

  {
    year: 2025,
    category: "Forensic Electrochemistry",
    title: "N-doped porous laser-induced graphene applied for forensic electrochemical sensing of xylazine.",
    journal: "Microchemical Journal",
    quartile: "Q1",
    impactFactor: "5.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.microc.2025.114935"
  },

  {
    year: 2025,
    category: "Forensic Electrochemistry",
    title: "One-step laser fabrication of a P-doped 3D porous graphene electrode for on-site detection of promethazine.",
    journal: "Talanta",
    quartile: "Q1",
    impactFactor: "6.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.talanta.2025.128715"
  },

  {
    year: 2025,
    category: "Sustainable Nanomaterials",
    title: "Revolutionizing oil palm biomass into laser-induced graphene for sustainable and high-performance electrochemical sensors.",
    journal: "Materials Today Chemistry",
    quartile: "Q1",
    impactFactor: "6.7",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.mtchem.2025.102872"
  },

  {
    year: 2025,
    category: "Forensic Electrochemistry",
    title: "Sustainable Paper-Derived Laser-Induced Graphene Electrochemical Platform for Ultra-Sensitive Diazepam Detection in Forensic Investigations.",
    journal: "ACS Omega",
    quartile: "Q1",
    impactFactor: "4.3",
    metricYear: "2024",
    doi: "https://doi.org/10.1021/acsomega.5c03662"
  },

  {
    year: 2025,
    category: "Environmental / Food Analysis",
    title: "Smartphone-enabled detection of urea in animal feed based on a disposable electrode modified with silver nanoparticles decorated on nitrogen-doped graphene nanoplatelets.",
    journal: "Talanta",
    quartile: "Q1",
    impactFactor: "6.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.talanta.2025.128431"
  },

  {
    year: 2025,
    category: "Environmental Analysis",
    title: "A disposable dual-mode electrochemical/colorimetric paper-based analytical device for simultaneous detection of hydroquinone and mercury ion.",
    journal: "Talanta",
    quartile: "Q1",
    impactFactor: "6.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.talanta.2025.128166"
  },

  {
    year: 2025,
    category: "Biomedical / Glucose Sensing",
    title: "Portable NFC potentiostat integrated with a 3D paper-based microfluidic electrochemical device for glucose detection in whole blood using PEDOT:PSS/DMSO/GOx sensitive film.",
    journal: "Microchemical Journal",
    quartile: "Q1",
    impactFactor: "5.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.microc.2025.113623"
  },

  {
    year: 2025,
    category: "Environmental Analysis",
    title: "A β-cyclodextrin/porous graphene ink electrode for smartphone-assisted electrochemical Hg²⁺ sensing.",
    journal: "Talanta",
    quartile: "Q1",
    impactFactor: "6.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.talanta.2025.127776"
  },

  {
    year: 2025,
    category: "Food / Electrochemical Analysis",
    title: "NS Dual-Doped 3D Porous Laser-Induced Graphene Electrode for Curcumin Determination in Turmeric.",
    journal: "Talanta",
    quartile: "Q1",
    impactFactor: "6.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.talanta.2025.127722"
  },

  {
    year: 2025,
    category: "Environmental Monitoring",
    title: "Cuprous oxide-functionalized activated porous carbon-modified screen-printed carbon electrode integrated with a smartphone for portable electrochemical nitrate detection.",
    journal: "Talanta",
    quartile: "Q1",
    impactFactor: "6.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.talanta.2025.127581"
  },

  {
    year: 2025,
    category: "Food / Forensic Analysis",
    title: "Portable unibody semi-flow injection voltammetric sensor for on-site screening of illegal additive sibutramine in food supplements.",
    journal: "Talanta",
    quartile: "Q1",
    impactFactor: "6.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.talanta.2024.127123"
  },

  {
    year: 2024,
    category: "Biomedical Analysis",
    title: "A disposable metal-free electrochemical sensor uses a boron/nitrogen co-doped multi-walled carbon nanotubes electrocatalyst to determine the anticancer drug flutamide.",
    journal: "Microchemical Journal",
    quartile: "Q1",
    impactFactor: "5.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.microc.2024.112217"
  },

  {
    year: 2024,
    category: "Biomedical Analysis",
    title: "A portable disposable metal-free electrochemical sensor for uric acid measurement in human blood serum.",
    journal: "Microchemical Journal",
    quartile: "Q1",
    impactFactor: "5.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.microc.2024.112216"
  },

  {
    year: 2024,
    category: "Biosensors",
    title: "Bio-functionalized conductive poly(acrylic acid):poly(3,4-ethylenedioxythiophene)-Prussian blue hybrid transducer for biosensors and bioelectronics interfaces.",
    journal: "Materials Today Chemistry",
    quartile: "Q1",
    impactFactor: "6.7",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.mtchem.2024.102271"
  },

  {
    year: 2024,
    category: "Environmental Monitoring",
    title: "Electrode modified with CO₂ laser-reduced graphene oxide-silver nanoparticles for determination of nitrite in water.",
    journal: "Microchemical Journal",
    quartile: "Q1",
    impactFactor: "5.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.microc.2024.111100"
  },

  {
    year: 2024,
    category: "Environmental Monitoring",
    title: "Single-drop electrodeposition of nanoneedle-like bismuth on disposable graphene electrode for on-site electrochemical detection of cadmium and lead.",
    journal: "Talanta",
    quartile: "Q1",
    impactFactor: "6.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.talanta.2024.126179"
  },

  {
    year: 2024,
    category: "Biomedical / Glucose Sensing",
    title: "Smartphone-interfaced flow injection amperometric system for enzyme-free glucose detection using a palladium-PANI/carbon microsphere@carbon nanotubes modified electrode.",
    journal: "Electrochimica Acta",
    quartile: "Q1",
    impactFactor: "5.6",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.electacta.2024.144292"
  },

  {
    year: 2024,
    category: "Food / Environmental Analysis",
    title: "Nano-palladium-decorated bismuth sulfide microspheres on a disposable electrode integrated with smartphone-based electrochemical detection of nitrite in food samples.",
    journal: "Food Chemistry",
    quartile: "Q1",
    impactFactor: "9.8",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.foodchem.2024.138987"
  },

  {
    year: 2024,
    category: "Forensic Analysis",
    title: "A novel 3D-printed portable electroplating device enhances latent fingerprints on metal substrates.",
    journal: "Talanta",
    quartile: "Q1",
    impactFactor: "6.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.talanta.2024.125822"
  },

  {
    year: 2024,
    category: "Environmental Analysis",
    title: "Electropolymerization of poly(phenol red) on laser-induced graphene electrode enhanced adsorption of zinc for electrochemical detection.",
    journal: "Talanta",
    quartile: "Q1",
    impactFactor: "6.1",
    metricYear: "2024",
    doi: "https://doi.org/10.1016/j.talanta.2024.125751"
  },

  {
    year: 2023,
    category: "Forensic Electrochemistry",
    title: "A Ternary Nanocomposite Based on Nano-Bimetallic Platinum/Nickel Decorated on Multi-Walled Carbon Nanotubes for Flow Injection Amperometric Detection of Promethazine.",
    journal: "Journal of The Electrochemical Society",
    quartile: "Q1",
    impactFactor: "3.1",
    metricYear: "2023",
    doi: "https://doi.org/10.1149/1945-7111/acdb9d"
  },

  {
    year: 2023,
    category: "Forensic / Food Analysis",
    title: "Sibutramine detection in weight-loss products using a sodium/phosphorus dual-doped carbon nanotubes modified electrode.",
    journal: "Microchemical Journal",
    quartile: "Q1",
    impactFactor: "4.9",
    metricYear: "2023",
    doi: "https://doi.org/10.1016/j.microc.2023.108668"
  },

  {
    year: 2023,
    category: "Biomedical / Biosensors",
    title: "Novel biosensor platform for glucose monitoring via smartphone based on battery-less NFC potentiostat.",
    journal: "Talanta",
    quartile: "Q1",
    impactFactor: "5.6",
    metricYear: "2023",
    doi: "https://doi.org/10.1016/j.talanta.2023.124266"
  },

  {
    year: 2023,
    category: "Electrocatalysis",
    title: "Polyaniline-coated glassy carbon microspheres decorated with nano-palladium as a new electrocatalyst for methanol oxidation.",
    journal: "Journal of Electroanalytical Chemistry",
    quartile: "Q1",
    impactFactor: "4.5",
    metricYear: "2023",
    doi: "https://doi.org/10.1016/j.jelechem.2022.116995"
  },

  {
    year: 2022,
    category: "Forensic Electrochemistry",
    title: "New electrode material integrates silver nanoprisms with phosphorus-doped carbon nanotubes for forensic detection of nitrite.",
    journal: "Electrochimica Acta",
    quartile: "Q1",
    impactFactor: "6.6",
    metricYear: "2022",
    doi: "https://doi.org/10.1016/j.electacta.2022.141439"
  },

  {
    year: 2022,
    category: "Environmental Analysis",
    title: "A poly(neutral red)/porous graphene modified electrode for a voltammetric hydroquinone sensor.",
    journal: "Electrochimica Acta",
    quartile: "Q1",
    impactFactor: "6.6",
    metricYear: "2022",
    doi: "https://doi.org/10.1016/j.electacta.2022.141272"
  },

  {
    year: 2022,
    category: "Food Analysis / Bhutan",
    title: "Detection of adulterants in some common food items available in the Bhutanese market.",
    journal: "Bhutan Journal of Research and Development",
    quartile: "",
    impactFactor: "",
    metricYear: "",
    details: "11(1)",
    doi: "https://doi.org/10.17102/bjrd.rub.11.1.026"
  }
];


/* =========================================================
   PUBLICATION UTILITIES
========================================================= */

function getPublicationYears() {
  const years = publications
    .map(pub => Number(pub.year))
    .filter(Boolean);

  return {
    newest: Math.max(...years),
    oldest: Math.min(...years)
  };
}


/* =========================================================
   PUBLICATION OVERVIEW
========================================================= */

function updatePublicationOverview() {

  const section =
    document.querySelector("#publications");

  if (!section) return;

  let overview =
    section.querySelector(".publication-overview");

  if (!overview) {

    overview =
      document.createElement("div");

    overview.className =
      "publication-overview";

    const controls =
      section.querySelector(
        ".publication-controls"
      );

    const publicationList =
      section.querySelector(".pub-list");

    if (controls) {

      section.insertBefore(
        overview,
        controls
      );

    } else if (publicationList) {

      section.insertBefore(
        overview,
        publicationList
      );

    } else {

      section.appendChild(
        overview
      );

    }
  }


  const total =
    publications.length;


  const {
    newest,
    oldest
  } = getPublicationYears();


  const q1Count =
    publications.filter(
      pub => pub.quartile === "Q1"
    ).length;


  const categories =
    new Set(
      publications.map(
        pub => pub.category
      )
    ).size;


  overview.innerHTML = `

    <div class="publication-overview-card">

      <span class="publication-overview-value">
        ${total}
      </span>

      <span class="publication-overview-label">
        Publications
      </span>

    </div>


    <div class="publication-overview-card">

      <span class="publication-overview-value">
        ${oldest}–${newest}
      </span>

      <span class="publication-overview-label">
        Publication Period
      </span>

    </div>


    <div class="publication-overview-card">

      <span class="publication-overview-value">
        ${q1Count}
      </span>

      <span class="publication-overview-label">
        Q1 Publications
      </span>

    </div>


    <div class="publication-overview-card">

      <span class="publication-overview-value">
        ${categories}
      </span>

      <span class="publication-overview-label">
        Research Areas
      </span>

    </div>

  `;
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================================================
   PUBLICATION METRICS DISPLAY
========================================================= */

function getPublicationDetails(pub) {

  const parts = [];

  if (pub.quartile) {
    parts.push(pub.quartile);
  }

  if (pub.impactFactor) {

    parts.push(
      `IF ${pub.impactFactor}${
        pub.metricYear
          ? ` (JCR ${pub.metricYear})`
          : ""
      }`
    );

  }

  if (pub.details) {
    parts.push(pub.details);
  }

  return parts.join(" · ");
}


/* =========================================================
   PUBLICATION COUNT
========================================================= */

function updatePublicationCount(
  list = publications
) {

  const section =
    document.querySelector("#publications");

  if (!section) return;

  let counter =
    section.querySelector(
      ".publication-count"
    );


  if (!counter) {

    counter =
      document.createElement("div");

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
  } = getPublicationYears();


  if (showing === total) {

    counter.innerHTML = `
      <div>
        <strong>
          ${total} Publications
        </strong>
      </div>

      <span>
        Peer-reviewed research articles ·
        ${oldest}–${newest}
      </span>
    `;

  } else {

    counter.innerHTML = `
      <div>
        <strong>
          Showing ${showing} of ${total} Publications
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

  if (!container) return;


  const sortedList =
    [...list].sort(
      (a, b) =>
        Number(b.year) -
        Number(a.year)
    );


  updatePublicationOverview();

  updatePublicationCount(
    sortedList
  );


  /* -------------------------------------------------------
     EMPTY RESULTS
  ------------------------------------------------------- */

  if (sortedList.length === 0) {

    container.innerHTML = `
      <div class="publication-empty">

        <h3>
          No publications found
        </h3>

        <p>
          Try a different search term,
          year, or research area.
        </p>

      </div>
    `;

    return;
  }


  /* -------------------------------------------------------
     PUBLICATION CARDS
  ------------------------------------------------------- */

  container.innerHTML =
    sortedList
      .map((pub, index) => {

        const title =
          escapeHTML(pub.title);

        const journal =
          escapeHTML(pub.journal);

        const category =
          escapeHTML(pub.category);

        const details =
          escapeHTML(
            getPublicationDetails(pub)
          );

        const year =
          escapeHTML(pub.year);

        const doi =
          escapeHTML(pub.doi);


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
              ${String(index + 1).padStart(2, "0")}
            </div>


            <div class="publication-content">

              <div class="publication-meta">

                <span>
                  ${year}
                </span>

                <span>
                  ${category}
                </span>

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


              <p class="publication-journal">
                ${journal}
              </p>


              ${
                pub.doi
                  ? `
                    <a
                      class="publication-doi"
                      href="${doi}"
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

      })
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

  if (!section) return;


  let controls =
    section.querySelector(
      ".publication-controls"
    );


  if (!controls) {

    controls =
      document.createElement("div");

    controls.className =
      "publication-controls";


    controls.innerHTML = `

      <input
        type="search"
        id="publication-search"
        placeholder="Search title, journal, keyword..."
        aria-label="Search publications"
        autocomplete="off"
      >


      <select
        id="publication-year"
        aria-label="Filter publications by year"
      >

        <option value="all">
          All years
        </option>

      </select>


      <select
        id="publication-category"
        aria-label="Filter publications by research area"
      >

        <option value="all">
          All research areas
        </option>

      </select>

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


  if (
    !search ||
    !yearSelect ||
    !categorySelect
  ) {
    return;
  }


  /* -------------------------------------------------------
     YEARS
  ------------------------------------------------------- */

  const years = [
    ...new Set(
      publications.map(
        pub => Number(pub.year)
      )
    )
  ].sort(
    (a, b) => b - a
  );


  if (
    yearSelect.options.length === 1
  ) {

    years.forEach(year => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        String(year);

      option.textContent =
        String(year);

      yearSelect.appendChild(
        option
      );

    });

  }


  /* -------------------------------------------------------
     CATEGORIES
  ------------------------------------------------------- */

  const categories = [
    ...new Set(
      publications.map(
        pub => pub.category
      )
    )
  ].sort(
    (a, b) =>
      a.localeCompare(b)
  );


  if (
    categorySelect.options.length === 1
  ) {

    categories.forEach(category => {

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

    });

  }


  /* -------------------------------------------------------
     FILTER FUNCTION
  ------------------------------------------------------- */

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
      publications.filter(pub => {

        const searchableText =
          [
            pub.title,
            pub.journal,
            pub.category,
            pub.year,
            pub.quartile,
            pub.impactFactor,
            pub.metricYear,
            pub.details
          ]
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

      });


    renderPublications(
      filtered
    );

  }


  /* -------------------------------------------------------
     EVENT LISTENERS
  ------------------------------------------------------- */

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
}


/* =========================================================
   INITIALIZE PUBLICATIONS
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    setupPublicationFilters();

    renderPublications();

  }
);
```
