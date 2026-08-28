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
       CLOSE MENU WHEN CLICKING OUTSIDE
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
       CLOSE MENU WHEN RESIZED TO DESKTOP
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

        fetch("data/cv/profile.json", {
          cache: "no-cache"
        }),

        fetch("data/cv/research.json", {
          cache: "no-cache"
        })

      ]);


    /* -----------------------------------------------------
       PROFILE DATA
    ----------------------------------------------------- */

    let profile = {};

    if (profileResponse.ok) {

      profile =
        await profileResponse.json();

    } else {

      console.warn(
        "profile.json could not be loaded:",
        profileResponse.status
      );

    }


    /* -----------------------------------------------------
       RESEARCH DATA
    ----------------------------------------------------- */

    let research = {};

    if (researchResponse.ok) {

      research =
        await researchResponse.json();

    } else {

      console.warn(
        "research.json could not be loaded:",
        researchResponse.status
      );

    }


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

       The extractor may produce projects in different
       structures. This section checks all supported forms.
    ----------------------------------------------------- */

    let projects = [];


    if (Array.isArray(research.projects)) {

      projects =
        research.projects;

    }


    else if (
      research.research_projects &&
      Array.isArray(research.research_projects)
    ) {

      projects =
        research.research_projects;

    }


    else if (
      research.data &&
      Array.isArray(research.data.projects)
    ) {

      projects =
        research.data.projects;

    }


    else if (
      Array.isArray(research)
    ) {

      projects =
        research;

    }


    renderResearchProjects(projects);


    console.log(
      "✓ CV research data loaded successfully."
    );

    console.log(
      `✓ Research projects detected: ${projects.length}`
    );

    console.log(
      `✓ Research grants detected: ${grants.length}`
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

  const container =
    document.getElementById("research-grants-list");

  /*
     The grants section is optional.

     If the current HTML does not contain the container,
     do nothing and leave the existing manually written
     grants section untouched.
  */

  if (!container) {

    return;

  }


  container.innerHTML = "";


  if (
    !Array.isArray(grants) ||
    grants.length === 0
  ) {

    /*
       Do not display a large fallback message over the
       dark section when no automatically extracted grants
       are available.
    */

    return;

  }


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
      typeof grant === "string"
        ? grant
        : (
            grant.description ||
            grant.title ||
            grant.name ||
            ""
          );


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

  const container =
    document.getElementById("research-projects-list");


  /*
     IMPORTANT:

     Your current index.html contains manually written
     project entries and does not currently contain
     #research-projects-list.

     Therefore, if the container does not exist, we leave
     the existing project section completely untouched.
  */

  if (!container) {

    console.log(
      "✓ Manual research project section detected. "
      + "Automatic project rendering skipped."
    );

    return;

  }


  /*
     Only replace the contents when genuine project data
     has actually been found.
  */

  if (
    !Array.isArray(projects) ||
    projects.length === 0
  ) {

    console.warn(
      "No automatically extracted research projects found. "
      + "Existing project content has been preserved."
    );

    return;

  }


  container.innerHTML = "";


  projects.forEach((project, index) => {

    const projectItem =
      document.createElement("article");

    projectItem.className =
      "research-project-item";


    /* -----------------------------------------------------
       PROJECT NUMBER
    ----------------------------------------------------- */

    const number =
      document.createElement("span");

    number.className =
      "research-project-number";

    number.textContent =
      String(index + 1).padStart(2, "0");


    /* -----------------------------------------------------
       PROJECT CONTENT
    ----------------------------------------------------- */

    const content =
      document.createElement("div");

    content.className =
      "research-project-content";


    /* -----------------------------------------------------
       PROJECT TITLE
    ----------------------------------------------------- */

    const title =
      document.createElement("h3");

    title.textContent =
      getProjectValue(
        project,
        [
          "project_entity",
          "title",
          "project_title",
          "name"
        ],
        "Research Project"
      );


    /* -----------------------------------------------------
       ROLE
    ----------------------------------------------------- */

    const roleValue =
      getProjectValue(
        project,
        [
          "role",
          "position",
          "investigator_role"
        ],
        ""
      );


    if (roleValue) {

      const role =
        document.createElement("span");

      role.className =
        "research-project-role";

      role.textContent =
        roleValue;

      content.appendChild(role);

    }


    /* -----------------------------------------------------
       DESCRIPTION
    ----------------------------------------------------- */

    const descriptionValue =
      getProjectValue(
        project,
        [
          "description",
          "details",
          "summary"
        ],
        ""
      );


    if (descriptionValue) {

      const description =
        document.createElement("p");

      description.textContent =
        descriptionValue;

      content.appendChild(description);

    }


    /* -----------------------------------------------------
       FUNDER
    ----------------------------------------------------- */

    const funderValue =
      getProjectValue(
        project,
        [
          "funder",
          "funding_agency",
          "organization",
          "client"
        ],
        ""
      );


    if (funderValue) {

      const funder =
        document.createElement("p");

      funder.className =
        "research-project-funder";

      funder.innerHTML =
        `<strong>Funder:</strong> ${escapeHTML(funderValue)}`;

      content.appendChild(funder);

    }


    /* -----------------------------------------------------
       YEAR
    ----------------------------------------------------- */

    const yearValue =
      getProjectValue(
        project,
        [
          "year",
          "date",
          "period"
        ],
        ""
      );


    if (yearValue) {

      const year =
        document.createElement("p");

      year.className =
        "research-project-year";

      year.innerHTML =
        `<strong>Year:</strong> ${escapeHTML(yearValue)}`;

      content.appendChild(year);

    }


    /* -----------------------------------------------------
       ASSEMBLE PROJECT
    ----------------------------------------------------- */

    projectItem.appendChild(number);

    projectItem.appendChild(content);

    container.appendChild(projectItem);

  });

}


/* =========================================================
   GET PROJECT VALUE
========================================================= */

function getProjectValue(
  project,
  possibleKeys,
  fallback = ""
) {

  if (!project || typeof project !== "object") {

    return fallback;

  }


  for (const key of possibleKeys) {

    if (
      project[key] !== undefined &&
      project[key] !== null &&
      String(project[key]).trim() !== ""
    ) {

      return String(project[key]).trim();

    }

  }


  return fallback;

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

