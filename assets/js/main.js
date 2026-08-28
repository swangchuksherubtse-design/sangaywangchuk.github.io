```javascript
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
     AUTOMATIC RESEARCH GRANTS LOADING
     
     Source:
       data/cv/profile.json

     The research_grants array is generated automatically
     by extract_cv.py from the Word CV.
  ======================================================= */

  loadResearchGrants();

});


/* =========================================================
   LOAD RESEARCH GRANTS FROM PROFILE.JSON
========================================================= */

async function loadResearchGrants() {

  try {

    const response = await fetch(
      "data/cv/profile.json",
      {
        cache: "no-cache"
      }
    );

    if (!response.ok) {

      throw new Error(
        `Unable to load profile.json: ${response.status}`
      );

    }

    const profile =
      await response.json();

    const grants =
      profile.research_grants || [];

    renderResearchGrants(grants);

  }

  catch (error) {

    console.error(
      "Research grants could not be loaded:",
      error
    );

  }

}


/* =========================================================
   RENDER RESEARCH GRANTS
========================================================= */

function renderResearchGrants(grants) {

  /*
     Look for an existing research-grants container.

     If the container does not yet exist, this function
     will not modify the rest of the Research section.
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

  if (!Array.isArray(grants) || grants.length === 0) {

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
```
