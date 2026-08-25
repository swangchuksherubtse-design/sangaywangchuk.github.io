Main.js

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

});
