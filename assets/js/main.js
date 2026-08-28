javascript
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
       data/cv/research.json

     These files are generated automatically by
     scripts/extract_cv.py from the Word CV.
  ======================================================= */

  loadCVResearchData();

});


/* =========================================================
   LOAD ALL CV RESEARCH DATA
========================================================= */

async function loadCVResearchData() {

  try {

    const [profileResponse, researchResponse] =
      await Promise.all([

        fetch(
          "data/cv/profile.json",
          {
            cache: "no-cache"
          }
        ),

        fetch(
          "data/cv/research.json",
          {
            cache: "no-cache"
          }
        )

      ]);


    if (!profileResponse.ok) {

      throw new Error(
        `Unable to load profile.json: ${profileResponse.status}`
      );

    }


    if (!researchResponse.ok) {

      throw new Error(
        `Unable to load research.json: ${researchResponse.status}`
      );

    }


    const profile =
      await profileResponse.json();

    const research =
      await researchResponse.json();


    /* -----------------------------------------------------
       LOAD RESEARCH GRANTS
    ----------------------------------------------------- */

    const grants =
      profile.research_grants || [];

    renderResearchGrants(grants);


    /* -----------------------------------------------------
       LOAD RESEARCH PROJECTS
    ----------------------------------------------------- */

    const projects =
      research.projects || [];

    renderResearchProjects(projects);


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
   LOAD RESEARCH GRANTS
========================================================= */

function renderResearchGrants(grants) {

  /*
     The function looks for:

       #research-grants-list

     If the container does not exist, the rest of the
     Research section remains unchanged.
  */

  const container =
    document.getElementById("research-grants-list");

  if (!container) {

    console.warn(
      "Research grants container #research-grants-list "
      + "was not found in index.html."
    );

    return;

  }


  /* -------------------------------------------------------
     Clear existing automatically generated content
  ------------------------------------------------------- */

  container.innerHTML = "";


  /* -------------------------------------------------------
     No grants found
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
     Create each research grant
  ------------------------------------------------------- */

  grants.forEach((grant, index) => {

    const grantItem =
      document.createElement("article");

    grantItem.className =
      "research-grant-item";


    const number =
      document.createElement("span");

    number.className =
      "research-grant-number";

    number.textContent =
      String(index + 1).padStart(2, "0");


    const content =
      document.createElement("div");

    content.className =
      "research-grant-content";


    const text =
      document.createElement("p");

    text.textContent =
      grant;


    content.appendChild(text);

    grantItem.appendChild(number);

    grantItem.appendChild(content);

    container.appendChild(grantItem);

  });

}


/* =========================================================
   LOAD RESEARCH PROJECTS
========================================================= */

function renderResearchProjects(projects) {

  /*
     The function looks for:

       #research-projects-list

     If the container does not exist, nothing else on the
     website is changed.
  */

  const container =
    document.getElementById("research-projects-list");

  if (!container) {

    console.warn(
      "Research projects container #research-projects-list "
      + "was not found in index.html."
    );

    return;

  }


  /* -------------------------------------------------------
     Clear existing automatically generated content
  ------------------------------------------------------- */

  container.innerHTML = "";


  /* -------------------------------------------------------
     No projects found
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
     Create each research project
  ------------------------------------------------------- */

  projects.forEach((project, index) => {

    const projectItem =
      document.createElement("article");

    projectItem.className =
      "research-project-item";


    /* -----------------------------------------------------
       Project number
    ----------------------------------------------------- */

    const number =
      document.createElement("span");

    number.className =
      "research-project-number";

    number.textContent =
      String(index + 1).padStart(2, "0");


    /* -----------------------------------------------------
       Project content
    ----------------------------------------------------- */

    const content =
      document.createElement("div");

    content.className =
      "research-project-content";


    /* -----------------------------------------------------
       Project title
    ----------------------------------------------------- */

    const title =
      document.createElement("h3");

    title.textContent =
      project.project_entity ||
      "Research Project";


    /* -----------------------------------------------------
       Role
    ----------------------------------------------------- */

    const role =
      document.createElement("span");

    role.className =
      "research-project-role";

    role.textContent =
      project.role ||
      "";


    /* -----------------------------------------------------
       Description
    ----------------------------------------------------- */

    const description =
      document.createElement("p");

    description.textContent =
      project.description ||
      "";


    /* -----------------------------------------------------
       Funder
    ----------------------------------------------------- */

    const funder =
      document.createElement("p");

    funder.className =
      "research-project-funder";

    if (project.funder) {

      funder.innerHTML =
        `<strong>Funder:</strong> ${escapeHTML(project.funder)}`;

    }


    /* -----------------------------------------------------
       Year
    ----------------------------------------------------- */

    const year =
      document.createElement("p");

    year.className =
      "research-project-year";

    if (project.year) {

      year.innerHTML =
        `<strong>Year:</strong> ${escapeHTML(project.year)}`;

    }


    /* -----------------------------------------------------
       Assemble project
    ----------------------------------------------------- */

    content.appendChild(title);

    if (role.textContent) {
      content.appendChild(role);
    }

    content.appendChild(description);

    if (project.funder) {
      content.appendChild(funder);
    }

    if (project.year) {
      content.appendChild(year);
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
