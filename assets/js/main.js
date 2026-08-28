/* =========================================================
   main.js
   Sangay Wangchuk Academic Profile
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       1. MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
            menuToggle.setAttribute(
                "aria-expanded",
                navLinks.classList.contains("active")
            );
        });

        // Close mobile menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =====================================================
       2. SMOOTH SCROLLING
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                const header = document.querySelector("header");
                const headerHeight = header
                    ? header.offsetHeight
                    : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                // Update URL without jumping
                history.replaceState(null, "", targetId);
            }
        });
    });


    /* =====================================================
       3. ACTIVE NAVIGATION LINK ON SCROLL
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    const updateActiveNavigation = () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 160;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navigationLinks.forEach((link) => {
            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveNavigation);
    updateActiveNavigation();


    /* =====================================================
       4. HEADER SHADOW / SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector("header");

    const updateHeader = () => {
        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    /* =====================================================
       5. BACK TO TOP BUTTON
       ===================================================== */

    const backToTop = document.querySelector(
        "#backToTop, .back-to-top"
    );

    if (backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        };

        window.addEventListener("scroll", toggleBackToTop);
        toggleBackToTop();

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* =====================================================
       6. FADE-IN ANIMATION
       ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".fade-in, .reveal, .animate-on-scroll"
    );

    if ("IntersectionObserver" in window && animatedElements.length) {
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        animatedElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    /* =====================================================
       7. CURRENT YEAR
       ===================================================== */

    const currentYear = new Date().getFullYear();

    document.querySelectorAll(
        "#currentYear, .current-year"
    ).forEach((element) => {
        element.textContent = currentYear;
    });


    /* =====================================================
       8. CV / RESEARCH DATA LOADER
       
       Loads automatically generated JSON data created
       from the Word CV.
       
       Expected location:
       data/cv/cv_data.json
       
       If the file is unavailable, the website continues
       functioning normally.
       ===================================================== */

    loadCVData();


    /* =====================================================
       9. INITIALISE RESEARCH PROJECTS
       ===================================================== */

    loadResearchProjects();
});


/* =========================================================
   CV DATA LOADER
   ========================================================= */

async function loadCVData() {
    try {
        const response = await fetch(
            "data/cv/cv_data.json",
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(
                `CV data request failed: ${response.status}`
            );
        }

        const cvData = await response.json();

        console.log("CV data loaded successfully.");

        updateCVContent(cvData);

    } catch (error) {
        console.warn(
            "CV data could not be loaded. Static website content will remain active.",
            error
        );
    }
}


/* =========================================================
   UPDATE CV-BASED CONTENT
   ========================================================= */

function updateCVContent(data) {
    if (!data || typeof data !== "object") {
        return;
    }

    /*
     * This function intentionally updates only elements
     * that have been given explicit data attributes.
     *
     * This prevents the CV automation from accidentally
     * replacing manually designed website content.
     */


    /* -----------------------------------------------------
       TEXT FIELDS
       ----------------------------------------------------- */

    document.querySelectorAll("[data-cv-field]").forEach(
        (element) => {
            const field = element.getAttribute("data-cv-field");

            if (!field) return;

            const value = getNestedValue(data, field);

            if (
                value !== undefined &&
                value !== null &&
                typeof value !== "object"
            ) {
                element.textContent = value;
            }
        }
    );


    /* -----------------------------------------------------
       COUNTS / STATISTICS
       ----------------------------------------------------- */

    updateStatistic(
        data,
        "publication_count",
        [
            '[data-stat="publications"]',
            "#publicationCount"
        ]
    );

    updateStatistic(
        data,
        "research_project_count",
        [
            '[data-stat="projects"]',
            "#projectCount"
        ]
    );


    /* -----------------------------------------------------
       PUBLICATION DATA
       ----------------------------------------------------- */

    if (
        Array.isArray(data.peer_reviewed_journal_articles) &&
        typeof window.renderPublicationsFromCV === "function"
    ) {
        window.renderPublicationsFromCV(
            data.peer_reviewed_journal_articles
        );
    }
}


/* =========================================================
   NESTED VALUE HELPER
   ========================================================= */

function getNestedValue(object, path) {
    return path
        .split(".")
        .reduce((current, key) => {
            if (
                current === undefined ||
                current === null
            ) {
                return undefined;
            }

            return current[key];
        }, object);
}


/* =========================================================
   UPDATE STATISTIC
   ========================================================= */

function updateStatistic(data, key, selectors) {
    const value = getNestedValue(data, key);

    if (
        value === undefined ||
        value === null
    ) {
        return;
    }

    selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach(
            (element) => {
                element.textContent = value;
            }
        );
    });
}


/* =========================================================
   RESEARCH PROJECT LOADER
   ========================================================= */

async function loadResearchProjects() {
    const projectContainer = document.querySelector(
        "#researchProjects"
    );

    /*
     * If the page does not contain the research-project
     * container, there is nothing to load.
     */

    if (!projectContainer) {
        return;
    }

    /*
     * Prevent duplicate loading if another script has
     * already populated the section.
     */

    if (
        projectContainer.dataset.loaded === "true"
    ) {
        return;
    }

    try {
        /*
         * Primary automatically generated research data.
         */

        const response = await fetch(
            "data/cv/research_projects.json",
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(
                `Research project request failed: ${response.status}`
            );
        }

        const projects = await response.json();

        if (!Array.isArray(projects)) {
            throw new Error(
                "Research project data is not an array."
            );
        }

        renderResearchProjects(
            projects,
            projectContainer
        );

        projectContainer.dataset.loaded = "true";

    } catch (error) {
        console.warn(
            "Automatically generated research project data could not be loaded.",
            error
        );

        /*
         * IMPORTANT:
         * Do not leave the page permanently showing
         * "Loading research projects..." if the JSON
         * file is unavailable.
         */

        showResearchFallback(projectContainer);
    }
}


/* =========================================================
   RENDER RESEARCH PROJECTS
   ========================================================= */

function renderResearchProjects(
    projects,
    container
) {
    if (!projects.length) {
        showResearchFallback(container);
        return;
    }

    container.innerHTML = "";

    projects.forEach((project) => {
        const card = document.createElement("article");

        card.className = "project-card";

        /*
         * Safely read project fields.
         */

        const title =
            project.title ||
            project.name ||
            "Research Project";

        const description =
            project.description ||
            project.summary ||
            "";

        const year =
            project.year ||
            project.date ||
            "";

        const area =
            project.research_area ||
            project.area ||
            "";

        card.innerHTML = `
            <div class="project-card-content">

                ${
                    year
                        ? `<span class="project-year">${escapeHTML(year)}</span>`
                        : ""
                }

                <h3>${escapeHTML(title)}</h3>

                ${
                    area
                        ? `<p class="project-area">${escapeHTML(area)}</p>`
                        : ""
                }

                ${
                    description
                        ? `<p>${escapeHTML(description)}</p>`
                        : ""
                }

            </div>
        `;

        container.appendChild(card);
    });
}


/* =========================================================
   RESEARCH FALLBACK
   ========================================================= */

function showResearchFallback(container) {
    /*
     * Do not destroy existing manually written research
     * projects.
     *
     * If the container already contains actual project
     * cards/content, simply remove the loading message.
     */

    const loadingMessage = container.querySelector(
        ".loading-message, .loading"
    );

    if (loadingMessage) {
        loadingMessage.remove();
    }

    /*
     * If there is already meaningful content, keep it.
     */

    if (
        container.children.length > 0 &&
        container.textContent.trim().length > 0
    ) {
        return;
    }

    /*
     * Otherwise provide a clean message instead of leaving
     * the user with an infinite loading indicator.
     */

    container.innerHTML = `
        <div class="research-status">
            <p>Research projects are currently being updated.</p>
        </div>
    `;
}


/* =========================================================
   HTML ESCAPE FUNCTION
   ========================================================= */

function escapeHTML(value) {
    if (value === undefined || value === null) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   PUBLIC API
   =========================================================
   
   These functions can be used by publications.js or
   other scripts if needed.
   ========================================================= */

window.loadCVData = loadCVData;
window.loadResearchProjects = loadResearchProjects;
window.renderResearchProjects = renderResearchProjects;
