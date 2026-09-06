/* =========================================================
   SANGAY WANGCHUK — PROFESSIONAL PROFILE
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("main.js loaded successfully.");

    /* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */

const navToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");

if (navToggle && navMenu) {

    // Set initial state
    navMenu.classList.remove("active");
    navMenu.style.removeProperty("display");
    navToggle.setAttribute("aria-expanded", "false");

    navToggle.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const isOpen = navMenu.classList.contains("active");

        if (isOpen) {

            navMenu.classList.remove("active");
            navMenu.style.setProperty("display", "none", "important");
            navToggle.setAttribute("aria-expanded", "false");

        } else {

            navMenu.classList.add("active");
            navMenu.style.setProperty("display", "flex", "important");
            navToggle.setAttribute("aria-expanded", "true");

        }

        console.log(
            "Mobile menu:",
            navMenu.classList.contains("active") ? "OPEN" : "CLOSED"
        );

    });

    // Close menu after selecting a navigation link
    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");
            navMenu.style.setProperty("display", "none", "important");
            navToggle.setAttribute("aria-expanded", "false");

        });

    });

}


    /* =========================================================
       2. SMOOTH SCROLLING
       ========================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

        anchor.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================================
       3. PROFESSIONAL REFEREE REQUEST FORM
       ========================================================= */

    const refereeForm =
        document.querySelector(".referee-form");

    if (refereeForm) {

        refereeForm.addEventListener("submit", function () {

            console.log(
                "Referee request form submitted."
            );

            /*
             * The form is handled by FormSubmit.
             * Do NOT prevent the default submission.
             */

        });

    }


    /* =========================================================
       4. BACK TO REFEREES
       ========================================================= */

    window.backToReferees = function () {

        const refereeSection =
            document.getElementById("referees");

        const formSection =
            document.getElementById("referee-request-form");

        if (formSection) {

            formSection.hidden = true;

        }

        if (refereeSection) {

            refereeSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };


    /* =========================================================
       5. SHOW REFEREE REQUEST FORM
       ========================================================= */

    window.showRefereeRequest = function (event) {

        if (event) {
            event.preventDefault();
        }

        const formSection =
            document.getElementById("referee-request-form");

        if (formSection) {

            formSection.hidden = false;

            setTimeout(function () {

                formSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 50);

        }

    };


    /* =========================================================
       6. OPEN REFEREE FORM FROM HASH
       ========================================================= */

    if (
        window.location.hash ===
        "#referee-request-form"
    ) {

        setTimeout(function () {

            const formSection =
                document.getElementById(
                    "referee-request-form"
                );

            if (formSection) {

                formSection.hidden = false;

                formSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }, 300);

    }


    /* =========================================================
       7. ACTIVE NAVIGATION
       ========================================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= 150) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =========================================================
       8. HEADER SCROLL EFFECT
       ========================================================= */

    const header =
        document.querySelector("header");

    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        });

    }


    /* =========================================================
       9. BACK TO TOP BUTTON
       ========================================================= */

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================================
       10. FADE-IN ANIMATIONS
       ========================================================= */

    const fadeElements =
        document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );

        fadeElements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        fadeElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =========================================================
       11. CURRENT YEAR
       ========================================================= */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =========================================================
       12. LOAD CV PROFILE DATA
       ========================================================= */

    loadCVData();


    /* =========================================================
       13. LOAD RESEARCH PROJECTS
       ========================================================= */

    loadResearchProjects();


    /* =========================================================
       14. LOAD RESEARCH GRANTS
       ========================================================= */

    loadResearchGrants();

});


/* =============================================================
   12. LOAD CV PROFILE DATA
   ============================================================= */

async function loadCVData() {

    const url =
        new URL(
            "data/cv/profile.json",
            document.baseURI
        ).href;

    console.log(
        "Loading CV profile:",
        url
    );

    try {

        const response =
            await fetch(url, {
                cache: "no-store"
            });

        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status +
                " - " +
                response.statusText
            );

        }

        const data =
            await response.json();

        console.log(
            "CV profile loaded successfully:",
            data
        );

        updateCVContent(data);

    } catch (error) {

        console.error(
            "ERROR loading profile.json:",
            error
        );

    }

}


/* =============================================================
   UPDATE CV CONTENT
   ============================================================= */

function updateCVContent(data) {

    if (
        !data ||
        typeof data !== "object"
    ) {
        return;
    }

    const elements =
        document.querySelectorAll("[data-cv]");

    elements.forEach(function (element) {

        const key =
            element.getAttribute("data-cv");

        if (!key) {
            return;
        }

        const value =
            getNestedValue(data, key);

        if (
            value !== undefined &&
            value !== null &&
            typeof value !== "object"
        ) {

            element.textContent =
                value;

        }

    });

}


/* =============================================================
   GET NESTED OBJECT VALUE
   ============================================================= */

function getNestedValue(object, path) {

    return path
        .split(".")
        .reduce(function (current, key) {

            if (
                current !== null &&
                current !== undefined
            ) {

                return current[key];

            }

            return undefined;

        }, object);

}


/* =============================================================
   UPDATE STATISTIC
   ============================================================= */

function updateStatistic(selector, value) {

    const element =
        document.querySelector(selector);

    if (
        element &&
        value !== undefined
    ) {

        element.textContent =
            value;

    }

}


/* =============================================================
   13. LOAD RESEARCH PROJECTS
   ============================================================= */

async function loadResearchProjects() {

    /*
     * IMPORTANT:
     * index.html uses:
     *
     * id="research-projects-list"
     */

    const container =
        document.getElementById(
            "research-projects-list"
        );

    if (!container) {

        console.error(
            "Research projects container #research-projects-list was not found."
        );

        return;

    }

    const url =
        new URL(
            "data/cv/research.json",
            document.baseURI
        ).href;

    console.log(
        "Loading research projects from:",
        url
    );

    try {

        const response =
            await fetch(url, {
                cache: "no-store"
            });

        console.log(
            "research.json response:",
            response.status,
            response.statusText
        );

        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status +
                " - " +
                response.statusText
            );

        }

        const data =
            await response.json();

        console.log(
            "Research JSON loaded successfully:",
            data
        );

        let projects = [];

        if (Array.isArray(data)) {

            projects = data;

        } else if (
            Array.isArray(data.projects)
        ) {

            projects = data.projects;

        } else if (
            Array.isArray(data.research_projects)
        ) {

            projects = data.research_projects;

        }

        console.log(
            "Research projects found:",
            projects.length
        );

        if (projects.length === 0) {

            showResearchFallback(
                "No research projects are currently listed."
            );

            return;

        }

        renderResearchProjects(
            projects,
            container
        );

    } catch (error) {

        console.error(
            "ERROR loading research projects:",
            error
        );

        showResearchFallback(
            "Research projects could not be loaded. Please check the browser console."
        );

    }

}


/* =============================================================
   RENDER RESEARCH PROJECTS
   ============================================================= */

function renderResearchProjects(projects, container) {

    container.innerHTML = projects.map(function (project, index) {

        const title =
            project.project_entity ||
            project.title ||
            project.project ||
            project.name ||
            "Research Project";

        const role =
            project.role ||
            "";

        const description =
            project.description ||
            "";

        const funder =
            project.funder ||
            project.client ||
            project.funding_agency ||
            project.organization ||
            "";

        const year =
            project.year ||
            "";

        return `
            <article class="project">

                <div class="project-no">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div>

                    ${
                        year || role
                            ? `
                                <p class="project-kicker">
                                    ${year ? escapeHTML(year) : ""}
                                    ${year && role ? " · " : ""}
                                    ${role ? escapeHTML(role) : ""}
                                </p>
                              `
                            : ""
                    }

                    <h3>
                        ${escapeHTML(title)}
                    </h3>

                    ${
                        description
                            ? `
                                <p>
                                    ${escapeHTML(description)}
                                </p>
                              `
                            : ""
                    }

                    ${
                        funder
                            ? `
                                <p>
                                    <strong>Funder:</strong>
                                    ${escapeHTML(funder)}
                                </p>
                              `
                            : ""
                    }

                </div>

            </article>
        `;

    }).join("");

}

/* =============================================================
   RESEARCH PROJECT FALLBACK
   ============================================================= */

function showResearchFallback(message) {

    const container =
        document.getElementById(
            "research-projects-list"
        );

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="research-loading-error">
            ${escapeHTML(message)}
        </div>
    `;

}


/* =============================================================
   14. LOAD RESEARCH GRANTS
   ============================================================= */

async function loadResearchGrants() {

    /*
     * IMPORTANT:
     * index.html uses:
     *
     * id="research-grants-list"
     */

    const container =
        document.getElementById(
            "research-grants-list"
        );

    if (!container) {

        console.error(
            "Research grants container #research-grants-list was not found."
        );

        return;

    }

    const url =
        new URL(
            "data/cv/profile.json",
            document.baseURI
        ).href;

    console.log(
        "Loading research grants from:",
        url
    );

    try {

        const response =
            await fetch(url, {
                cache: "no-store"
            });

        console.log(
            "profile.json response:",
            response.status,
            response.statusText
        );

        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status +
                " - " +
                response.statusText
            );

        }

        const data =
            await response.json();

        console.log(
            "Profile JSON loaded for grants:",
            data
        );

        const grants =
            Array.isArray(data.research_grants)
                ? data.research_grants
                : [];

        console.log(
            "Research grants found:",
            grants.length
        );

        if (grants.length === 0) {

            showGrantFallback(
                "No research grants are currently listed."
            );

            return;

        }

        renderResearchGrants(
            grants,
            container
        );

    } catch (error) {

        console.error(
            "ERROR loading research grants:",
            error
        );

        showGrantFallback(
            "Research grants could not be loaded. Please check the browser console."
        );

    }

}


/* =============================================================
   RENDER RESEARCH GRANTS
   ============================================================= */

function renderResearchGrants(
    grants,
    container
) {

    container.innerHTML =
        grants.map(function (grant, index) {

            /*
             * String-based grant
             */

            if (typeof grant === "string") {

                return `
                    <article class="research-grant">

                        <div class="grant-no">
                            ${String(index + 1).padStart(2, "0")}
                        </div>

                        <div class="grant-content">

                            <p>
                                ${escapeHTML(grant)}
                            </p>

                        </div>

                    </article>
                `;

            }


            /*
             * Object-based grant
             */

            const title =
                grant.title ||
                grant.project ||
                grant.name ||
                "Research Grant";

            const amount =
                grant.amount ||
                grant.value ||
                grant.funding ||
                "";

            const funder =
                grant.funder ||
                grant.organization ||
                grant.agency ||
                "";

            const year =
                grant.year ||
                "";

            const description =
                grant.description ||
                grant.details ||
                "";

            return `
                <article class="research-grant">

                    <div class="grant-no">
                        ${String(index + 1).padStart(2, "0")}
                    </div>

                    <div class="grant-content">

                        <h3>
                            ${escapeHTML(title)}
                        </h3>

                        ${
                            description
                                ? `
                                    <p>
                                        ${escapeHTML(description)}
                                    </p>
                                  `
                                : ""
                        }

                        ${
                            funder
                                ? `
                                    <p class="grant-meta">
                                        <strong>Funder:</strong>
                                        ${escapeHTML(funder)}
                                    </p>
                                  `
                                : ""
                        }

                        ${
                            amount
                                ? `
                                    <p class="grant-meta">
                                        <strong>Amount:</strong>
                                        ${escapeHTML(amount)}
                                    </p>
                                  `
                                : ""
                        }

                        ${
                            year
                                ? `
                                    <p class="grant-meta">
                                        <strong>Year:</strong>
                                        ${escapeHTML(year)}
                                    </p>
                                  `
                                : ""
                        }

                    </div>

                </article>
            `;

        }).join("");

}


/* =============================================================
   RESEARCH GRANT FALLBACK
   ============================================================= */

function showGrantFallback(message) {

    const container =
        document.getElementById(
            "research-grants-list"
        );

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="research-loading-error">
            ${escapeHTML(message)}
        </div>
    `;

}


/* =============================================================
   ESCAPE HTML
   ============================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =============================================================
   END OF MAIN.JS
   ============================================================= */
