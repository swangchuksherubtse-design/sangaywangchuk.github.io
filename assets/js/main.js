/* =========================================================
   MAIN WEBSITE JAVASCRIPT
   Dr. Sangay Wangchuk — Academic Website
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {

    toggle.addEventListener("click", () => {

      const isOpen = links.classList.toggle("open");

      toggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    /* -----------------------------------------------------
       CLOSE MOBILE MENU AFTER SELECTING A LINK
    ----------------------------------------------------- */

    links.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        links.classList.remove("open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });


    /* -----------------------------------------------------
       CLOSE MENU WHEN CLICKING OUTSIDE IT
    ----------------------------------------------------- */

    document.addEventListener("click", event => {

      const clickedInsideMenu =
        links.contains(event.target);

      const clickedToggle =
        toggle.contains(event.target);

      if (
        !clickedInsideMenu &&
        !clickedToggle &&
        links.classList.contains("open")
      ) {

        links.classList.remove("open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });


    /* -----------------------------------------------------
       CLOSE MENU WHEN WINDOW IS RESIZED TO DESKTOP
    ----------------------------------------------------- */

    window.addEventListener("resize", () => {

      if (window.innerWidth > 900) {

        links.classList.remove("open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }


  /* =======================================================
     SMOOTH INTERNAL NAVIGATION
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     AUTOMATIC CV DATA LOADING

     Source:
       data/cv/profile.json

     The profile.json file is generated automatically by
     scripts/extract_cv.py from the Word CV.

     It contains:
       - projects
       - research_grants
       - reports
       - submitted_manuscripts
       - phd_thesis
  ======================================================= */

  loadCVResearchData();

});


/* =========================================================
   LOAD CV RESEARCH DATA
========================================================= */

async function loadCVResearchData() {

  try {

    const response =
      await fetch(
        "data/cv/profile.json",
        {
          cache: "no-cache"
        }
      );


    /* -----------------------------------------------------
       CHECK RESPONSE
    ----------------------------------------------------- */

    if (!response.ok) {

      throw new Error(
        `Unable to load profile.json: ${response.status}`
      );

    }


    /* -----------------------------------------------------
       READ JSON
    ----------------------------------------------------- */

    const profile =
      await response.json();


    /* -----------------------------------------------------
       LOAD RESEARCH GRANTS
    ----------------------------------------------------- */

    const grants =
      Array.isArray(profile.research_grants)
        ? profile.research_grants
        : [];

    renderResearchGrants(grants);


    /* -----------------------------------------------------
       LOAD RESEARCH PROJECTS
    ----------------------------------------------------- */

    const projects =
      Array.isArray(profile.projects)
        ? profile.projects
        : [];

    renderResearchProjects(projects);


    /* -----------------------------------------------------
       SUCCESS MESSAGE
    ----------------------------------------------------- */

    console.log(
      "✓ CV research data loaded successfully."
    );

    console.log(
      `✓ Research projects: ${projects.length}`
    );

    console.log(
      `✓ Research grants: ${grants.length}`
    );

  }

  catch (error) {

    console.error(
      "CV research data could not be loaded:",
      error
    );

  }

}


/* =========================================================
   RENDER RESEARCH GRANTS
========================================================= */

function renderResearchGrants(grants) {

  /*
     Looks for:

       #research-grants-list

     If the container does not exist, the rest of the
     website remains unchanged.
  */

  const container =
    document.getElementById(
      "research-grants-list"
    );


  if (!container) {

    console.warn(
      "Research grants container #research-grants-list "
      + "was not found in index.html."
    );

    return;

  }


  /* -------------------------------------------------------
     CLEAR EXISTING CONTENT
  ------------------------------------------------------- */

  container.innerHTML = "";


  /* -------------------------------------------------------
     NO GRANTS
  ------------------------------------------------------- */

  if (
    !Array.isArray(grants) ||
    grants.length === 0
  ) {

    container.innerHTML = `
      <p class="research-grants-empty">
        No research grants are currently listed.
      </p>
    `;

    return;

  }


  /* -------------------------------------------------------
     CREATE EACH GRANT
  ------------------------------------------------------- */

  grants.forEach((grant, index) => {

    const grantItem =
      document.createElement("article");

    grantItem.className =
      "research-grant-item";


    /* -----------------------------------------------------
       NUMBER
    ----------------------------------------------------- */

    const number =
      document.createElement("span");

    number.className =
      "research-grant-number";

    number.textContent =
      String(index + 1).padStart(2, "0");


    /* -----------------------------------------------------
       CONTENT
    ----------------------------------------------------- */

    const content =
      document.createElement("div");

    content.className =
      "research-grant-content";


    /* -----------------------------------------------------
       TEXT
    ----------------------------------------------------- */

    const text =
      document.createElement("p");

    text.textContent =
      grant;


    /* -----------------------------------------------------
       ASSEMBLE
    ----------------------------------------------------- */

    content.appendChild(text);

    grantItem.appendChild(number);

    grantItem.appendChild(content);

    container.appendChild(grantItem);

  });

}


/* =========================================================
   RENDER RESEARCH PROJECTS
========================================================= */

function renderResearchProjects(projects) {

  /*
     Looks for:

       #research-projects-list

     The project records are generated directly from the
     projects array in data/cv/profile.json.
  */

  const container =
    document.getElementById(
      "research-projects-list"
    );


  if (!container) {

    console.warn(
      "Research projects container #research-projects-list "
      + "was not found in index.html."
    );

    return;

  }


  /* -------------------------------------------------------
     CLEAR EXISTING CONTENT
  ------------------------------------------------------- */

  container.innerHTML = "";


  /* -------------------------------------------------------
     NO PROJECTS
  ------------------------------------------------------- */

  if (
    !Array.isArray(projects) ||
    projects.length === 0
  ) {

    container.innerHTML = `
      <p class="research-projects-empty">
        No research projects are currently listed.
      </p>
    `;

    return;

  }


  /* -------------------------------------------------------
     CREATE EACH PROJECT
  ------------------------------------------------------- */

  projects.forEach((project, index) => {

    const projectItem =
      document.createElement("article");

    projectItem.className =
      "project";


    /* -----------------------------------------------------
       PROJECT NUMBER
    ----------------------------------------------------- */

    const number =
      document.createElement("div");

    number.className =
      "project-no";

    number.textContent =
      String(index + 1).padStart(2, "0");


    /* -----------------------------------------------------
       PROJECT CONTENT
    ----------------------------------------------------- */

    const content =
      document.createElement("div");


    /* -----------------------------------------------------
       PROJECT KICKER
    ----------------------------------------------------- */

    const kicker =
      document.createElement("p");

    kicker.className =
      "project-kicker";

    const role =
      project.role || "";

    const year =
      project.year || "";

    const funder =
      project.funder || "";

    const kickerParts = [];

    if (role) {
      kickerParts.push(
        role.toUpperCase()
      );
    }

    if (funder) {
      kickerParts.push(
        funder.toUpperCase()
      );
    }

    if (year) {
      kickerParts.push(
        year
      );
    }

    kicker.textContent =
      kickerParts.join(" · ");


    /* -----------------------------------------------------
       PROJECT TITLE
    ----------------------------------------------------- */

    const title =
      document.createElement("h3");

    title.textContent =
      project.project_entity ||
      "Research Project";


    /* -----------------------------------------------------
       PROJECT DESCRIPTION
    ----------------------------------------------------- */

    const description =
      document.createElement("p");

    let descriptionText =
      project.description || "";


    /*
       The extracted CV description may already begin
       with "Principal Investigator:" or "Co-PI:".

       Since the role is displayed separately in the
       project kicker, remove the repeated role prefix
       for a cleaner presentation.
    */

    descriptionText =
      descriptionText.replace(
        /^Principal Investigator:\s*/i,
        ""
      );

    descriptionText =
      descriptionText.replace(
        /^Co-Principal Investigator:\s*/i,
        ""
      );

    descriptionText =
      descriptionText.replace(
        /^Co-PI:\s*/i,
        ""
      );

    descriptionText =
      descriptionText.replace(
        /^Core Member:\s*/i,
        ""
      );

    description.textContent =
      descriptionText;


    /* -----------------------------------------------------
       TAGS
    ----------------------------------------------------- */

    const tags =
      document.createElement("div");

    tags.className =
      "tags";


    /* ROLE TAG */

    if (role) {

      const roleTag =
        document.createElement("span");

      roleTag.textContent =
        role;

      tags.appendChild(roleTag);

    }


    /* FUNDER TAG */

    if (funder) {

      const funderTag =
        document.createElement("span");

      funderTag.textContent =
        funder;

      tags.appendChild(funderTag);

    }


    /* YEAR TAG */

    if (year) {

      const yearTag =
        document.createElement("span");

      yearTag.textContent =
        year;

      tags.appendChild(yearTag);

    }


    /* -----------------------------------------------------
       ASSEMBLE PROJECT
    ----------------------------------------------------- */

    content.appendChild(kicker);

    content.appendChild(title);

    if (descriptionText) {
      content.appendChild(description);
    }

    if (tags.children.length > 0) {
      content.appendChild(tags);
    }


    projectItem.appendChild(number);

    projectItem.appendChild(content);

    container.appendChild(projectItem);

  });

}


/* =========================================================
   BASIC HTML ESCAPING
========================================================= */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}
