const publications = [
  {
    year: 2026,
    category: "Environmental Monitoring",
    title: "A smartphone-assisted NFC-enabled microfluidic electrochemical sensor for on-site monitoring of residual free chlorine in water.",
    journal: "Journal of Environmental Chemical Engineering",
    details: "Q1 · IF 7.5",
    doi: "https://doi.org/10.1016/j.jece.2026.123838"
  },
  {
    year: 2026,
    category: "Biomedical / Wearable Sensors",
    title: "Ammonium Ion-Sensing Skin Patch Based on Three-Dimensional Nanoarchitecture of Polystyrenesulfonate:Polyaniline/Copper Microflowers Deposited on Flexible Graphene Electrodes.",
    journal: "ACS Applied Nano Materials",
    details: "Q1 · IF 5.5",
    doi: "https://doi.org/10.1021/acsanm.5c05854"
  },
  {
    year: 2026,
    category: "Forensic Electrochemistry",
    title: "Electrochemical clonazepam sensor based on B-doped laser-induced graphene for on-site forensic analysis.",
    journal: "Microchemical Journal",
    details: "Q1 · IF 5.1",
    doi: "https://doi.org/10.1016/j.microc.2026.117476"
  },
  {
    year: 2025,
    category: "Forensic Electrochemistry",
    title: "N-doped porous laser-induced graphene applied for forensic electrochemical sensing of xylazine.",
    journal: "Microchemical Journal",
    details: "Q1 · IF 5.1",
    doi: "https://doi.org/10.1016/j.microc.2025.114935"
  },
  {
    year: 2025,
    category: "Forensic Electrochemistry",
    title: "One-step laser fabrication of a P-doped 3D porous graphene electrode for on-site detection of promethazine.",
    journal: "Talanta",
    details: "Q1 · IF 6.1",
    doi: "https://doi.org/10.1016/j.talanta.2025.128715"
  },
  {
    year: 2025,
    category: "Sustainable Nanomaterials",
    title: "Revolutionizing oil palm biomass into laser-induced graphene for sustainable and high-performance electrochemical sensors.",
    journal: "Materials Today Chemistry",
    details: "Q1 · IF 6.7",
    doi: "https://doi.org/10.1016/j.mtchem.2025.102872"
  },
  {
    year: 2025,
    category: "Forensic Electrochemistry",
    title: "Sustainable Paper-Derived Laser-Induced Graphene Electrochemical Platform for Ultra-Sensitive Diazepam Detection in Forensic Investigations.",
    journal: "ACS Omega",
    details: "Q1 · IF 4.3",
    doi: "https://doi.org/10.1021/acsomega.5c03662"
  },
  {
    year: 2025,
    category: "Environmental / Food Analysis",
    title: "Smartphone-enabled detection of urea in animal feed based on a disposable electrode modified with silver nanoparticles decorated on nitrogen-doped graphene nanoplatelets.",
    journal: "Talanta",
    details: "Q1 · IF 6.1",
    doi: "https://doi.org/10.1016/j.talanta.2025.128431"
  },
  {
    year: 2025,
    category: "Environmental Analysis",
    title: "A disposable dual-mode electrochemical/colorimetric paper-based analytical device for simultaneous detection of hydroquinone and mercury ion.",
    journal: "Talanta",
    details: "Q1 · IF 6.1",
    doi: "https://doi.org/10.1016/j.talanta.2025.128166"
  },
  {
    year: 2025,
    category: "Biomedical / Glucose Sensing",
    title: "Portable NFC potentiostat integrated with a 3D paper-based microfluidic electrochemical device for glucose detection in whole blood using PEDOT:PSS/DMSO/GOx sensitive film.",
    journal: "Microchemical Journal",
    details: "Q1 · IF 5.1",
    doi: "https://doi.org/10.1016/j.microc.2025.113623"
  },
  {
    year: 2025,
    category: "Environmental Analysis",
    title: "A β-cyclodextrin/porous graphene ink electrode for smartphone-assisted electrochemical Hg²⁺ sensing.",
    journal: "Talanta",
    details: "Q1 · IF 6.1",
    doi: "https://doi.org/10.1016/j.talanta.2025.127776"
  },
  {
    year: 2025,
    category: "Food / Electrochemical Analysis",
    title: "NS Dual-Doped 3D Porous Laser-Induced Graphene Electrode for Curcumin Determination in Turmeric.",
    journal: "Talanta",
    details: "Q1 · IF 6.1",
    doi: "https://doi.org/10.1016/j.talanta.2025.127722"
  },
  {
    year: 2025,
    category: "Environmental Monitoring",
    title: "Cuprous oxide-functionalized activated porous carbon-modified screen-printed carbon electrode integrated with a smartphone for portable electrochemical nitrate detection.",
    journal: "Talanta",
    details: "Q1 · IF 6.1",
    doi: "https://doi.org/10.1016/j.talanta.2025.127581"
  },
  {
    year: 2025,
    category: "Food / Forensic Analysis",
    title: "Portable unibody semi-flow injection voltammetric sensor for on-site screening of illegal additive sibutramine in food supplements.",
    journal: "Talanta",
    details: "Q1 · IF 6.1",
    doi: "https://doi.org/10.1016/j.talanta.2024.127123"
  },
  {
    year: 2024,
    category: "Biomedical Analysis",
    title: "A disposable metal-free electrochemical sensor uses a boron/nitrogen co-doped multi-walled carbon nanotubes electrocatalyst to determine the anticancer drug flutamide.",
    journal: "Microchemical Journal",
    details: "Q1 · IF 5.1",
    doi: "https://doi.org/10.1016/j.microc.2024.112217"
  },
  {
    year: 2024,
    category: "Biomedical Analysis",
    title: "A portable disposable metal-free electrochemical sensor for uric acid measurement in human blood serum.",
    journal: "Microchemical Journal",
    details: "Q1 · IF 5.1",
    doi: "https://doi.org/10.1016/j.microc.2024.112216"
  },
  {
    year: 2024,
    category: "Biosensors",
    title: "Bio-functionalized conductive poly(acrylic acid):poly(3,4-ethylenedioxythiophene)-Prussian blue hybrid transducer for biosensors and bioelectronics interfaces.",
    journal: "Materials Today Chemistry",
    details: "Q1 · IF 6.7",
    doi: "https://doi.org/10.1016/j.mtchem.2024.102271"
  },
  {
    year: 2024,
    category: "Environmental Monitoring",
    title: "Electrode modified with CO₂ laser-reduced graphene oxide-silver nanoparticles for determination of nitrite in water.",
    journal: "Microchemical Journal",
    details: "Q1 · IF 5.1",
    doi: "https://doi.org/10.1016/j.microc.2024.111100"
  },
  {
    year: 2024,
    category: "Environmental Monitoring",
    title: "Single-drop electrodeposition of nanoneedle-like bismuth on disposable graphene electrode for on-site electrochemical detection of cadmium and lead.",
    journal: "Talanta",
    details: "Q1 · IF 6.1",
    doi: "https://doi.org/10.1016/j.talanta.2024.126179"
  },
  {
    year: 2024,
    category: "Biomedical / Glucose Sensing",
    title: "Smartphone-interfaced flow injection amperometric system for enzyme-free glucose detection using a palladium-PANI/carbon microsphere@carbon nanotubes modified electrode.",
    journal: "Electrochimica Acta",
    details: "Q1 · IF 6.6",
    doi: "https://doi.org/10.1016/j.electacta.2024.144292"
  },
  {
    year: 2024,
    category: "Food / Environmental Analysis",
    title: "Nano-palladium-decorated bismuth sulfide microspheres on a disposable electrode integrated with smartphone-based electrochemical detection of nitrite in food samples.",
    journal: "Food Chemistry",
    details: "Q1 · IF 8.8",
    doi: "https://doi.org/10.1016/j.foodchem.2024.138987"
  },
  {
    year: 2024,
    category: "Forensic Analysis",
    title: "A novel 3D-printed portable electroplating device enhances latent fingerprints on metal substrates.",
    journal: "Talanta",
    details: "Q1 · IF 6.1",
    doi: "https://doi.org/10.1016/j.talanta.2024.125822"
  },
  {
    year: 2024,
    category: "Environmental Analysis",
    title: "Electropolymerization of poly(phenol red) on laser-induced graphene electrode enhanced adsorption of zinc for electrochemical detection.",
    journal: "Talanta",
    details: "Q1 · IF 6.1",
    doi: "https://doi.org/10.1016/j.talanta.2024.125751"
  },
  {
    year: 2023,
    category: "Forensic Electrochemistry",
    title: "A Ternary Nanocomposite Based on Nano-Bimetallic Platinum/Nickel Decorated on Multi-Walled Carbon Nanotubes for Flow Injection Amperometric Detection of Promethazine.",
    journal: "Journal of The Electrochemical Society",
    details: "Q1 · IF 3.9",
    doi: "https://doi.org/10.1149/1945-7111/acdb9d"
  },
  {
    year: 2023,
    category: "Forensic / Food Analysis",
    title: "Sibutramine detection in weight-loss products using a sodium/phosphorus dual-doped carbon nanotubes modified electrode.",
    journal: "Microchemical Journal",
    details: "Q1 · IF 5.1",
    doi: "https://doi.org/10.1016/j.microc.2023.108668"
  },
  {
    year: 2023,
    category: "Biomedical / Biosensors",
    title: "Novel biosensor platform for glucose monitoring via smartphone based on battery-less NFC potentiostat.",
    journal: "Talanta",
    details: "Q1 · IF 6.1",
    doi: "https://doi.org/10.1016/j.talanta.2023.124266"
  },
  {
    year: 2022,
    category: "Forensic Electrochemistry",
    title: "New electrode material integrates silver nanoprisms with phosphorus-doped carbon nanotubes for forensic detection of nitrite.",
    journal: "Electrochimica Acta",
    details: "Q1 · IF 6.6",
    doi: "https://doi.org/10.1016/j.electacta.2022.141439"
  },
  {
    year: 2022,
    category: "Environmental Analysis",
    title: "A poly(neutral red)/porous graphene modified electrode for a voltammetric hydroquinone sensor.",
    journal: "Electrochimica Acta",
    details: "Q1 · IF 6.6",
    doi: "https://doi.org/10.1016/j.electacta.2022.141272"
  },
  {
    year: 2023,
    category: "Electrocatalysis",
    title: "Polyaniline-coated glassy carbon microspheres decorated with nano-palladium as a new electrocatalyst for methanol oxidation.",
    journal: "Journal of Electroanalytical Chemistry",
    details: "Q1 · IF 4.5",
    doi: "https://doi.org/10.1016/j.jelechem.2022.116995"
  },
  {
    year: 2022,
    category: "Food Analysis / Bhutan",
    title: "Detection of adulterants in some common food items available in the Bhutanese market.",
    journal: "Bhutan Journal of Research and Development",
    details: "11(1)",
    doi: "https://doi.org/10.17102/bjrd.rub.11.1.026"
  }
];


/* =========================================================
   RENDER PUBLICATIONS
   ========================================================= */

function renderPublications(list = publications) {
  const container = document.querySelector(".pub-list");

  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="publication-empty">
        <h3>No publications found</h3>
        <p>
          Try a different search term, year, or research area.
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map((pub, index) => `
    <article class="publication-item">
      <div class="publication-number">
        ${String(index + 1).padStart(2, "0")}
      </div>

      <div class="publication-content">
        <div class="publication-meta">
          <span>${pub.year}</span>
          <span>${pub.category}</span>
          <span>${pub.details}</span>
        </div>

        <h3>${pub.title}</h3>

        <p class="publication-journal">
          ${pub.journal}
        </p>

        <a
          class="publication-doi"
          href="${pub.doi}"
          target="_blank"
          rel="noopener noreferrer"
        >
          View DOI →
        </a>
      </div>
    </article>
  `).join("");
}


/* =========================================================
   PUBLICATION FILTERS
   ========================================================= */

function setupPublicationFilters() {
  const section = document.querySelector("#publications");

  if (!section) return;

  const feature = section.querySelector(".pub-feature");

  if (!feature) return;

  const controls = document.createElement("div");

  controls.className = "publication-controls";

  controls.innerHTML = `
    <input
      type="search"
      id="publication-search"
      placeholder="Search publications..."
      aria-label="Search publications"
    >

    <select
      id="publication-year"
      aria-label="Filter by publication year"
    >
      <option value="all">All years</option>
    </select>

    <select
      id="publication-category"
      aria-label="Filter by research area"
    >
      <option value="all">All research areas</option>
    </select>
  `;

  feature.parentNode.insertBefore(controls, feature);


  /* -------------------------------------------------------
     Automatically generate year options
     ------------------------------------------------------- */

  const yearSelect =
    controls.querySelector("#publication-year");

  const years = [...new Set(
    publications.map(pub => pub.year)
  )].sort((a, b) => b - a);

  years.forEach(year => {
    const option = document.createElement("option");

    option.value = year;
    option.textContent = year;

    yearSelect.appendChild(option);
  });


  /* -------------------------------------------------------
     Automatically generate category options
     ------------------------------------------------------- */

  const categorySelect =
    controls.querySelector("#publication-category");

  const categories = [...new Set(
    publications.map(pub => pub.category)
  )].sort((a, b) => a.localeCompare(b));

  categories.forEach(category => {
    const option = document.createElement("option");

    option.value = category;
    option.textContent = category;

    categorySelect.appendChild(option);
  });


  /* -------------------------------------------------------
     Filter publications
     ------------------------------------------------------- */

  const search =
    controls.querySelector("#publication-search");

  function filterPublications() {
    const searchTerms = search.value
  .toLowerCase()
  .split(/[\s,]+/)
  .map(term => term.trim())
  .filter(Boolean);

const selectedYear =
  yearSelect.value;

const selectedCategory =
  categorySelect.value;

const filtered = publications.filter(pub => {

  const searchableText =
    `${pub.title} ${pub.journal} ${pub.category} ${pub.year}`
    .toLowerCase();

  const matchesSearch =
    searchTerms.length === 0 ||
    searchTerms.every(term =>
      searchableText.includes(term)
    );

      const matchesYear =
        selectedYear === "all" ||
        String(pub.year) === selectedYear;

      const matchesCategory =
        selectedCategory === "all" ||
        pub.category === selectedCategory;

      return (
        matchesSearch &&
        matchesYear &&
        matchesCategory
      );
    });

    renderPublications(filtered);
  }


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

document.addEventListener("DOMContentLoaded", () => {
  renderPublications();
  setupPublicationFilters();
});
