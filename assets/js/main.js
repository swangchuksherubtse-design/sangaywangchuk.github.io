javascript
/* =========================================================
   SANGAY WANGCHUK — PROFESSIONAL PROFILE
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("main.js loaded successfully.");

    /* =========================================================
       1. MOBILE NAVIGATION
       ========================================================= */

    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            navToggle.classList.toggle("active");
        });

        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                navToggle.classList.remove("active");
            });
        });
    }


    /* =========================================================
       2. SMOOTH SCROLLING
       ========================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

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

    const refereeForm = document.getElementById("refereeRequestForm");

    if (refereeForm) {

        refereeForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const formData = new FormData(refereeForm);

            const name = formData.get("name") || "";
            const email = formData.get("email") || "";
            const institution = formData.get("institution") || "";
            const purpose = formData.get("purpose") || "";

            const subject =
                "Professional Reference Request - " + name;

            const body =
                "Dear Dr. Wangchuk,%0D%0A%0D%0A" +
                "I would like to request a professional reference.%0D%0A%0D%0A" +
                "Name: " + encodeURIComponent(name) + "%0D%0A" +
                "Email: " + encodeURIComponent(email) + "%0D%0A" +
                "Institution: " + encodeURIComponent(institution) + "%0D%0A" +
                "Purpose: " + encodeURIComponent(purpose) + "%0D%0A%0D%0A" +
                "Thank you.";

            window.location.href =
                "mailto:?subject=" +
                encodeURIComponent(subject) +
                "&body=" +
                body;
        });
    }


    /* =========================================================
       4. BACK TO REFEREES
       ========================================================= */

    window.backToReferees = function () {

        const formSection =
            document.getElementById("referee-request");

        if (formSection) {
            formSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    };


    /* =========================================================
       5. OPEN REFEREE FORM FROM HASH
       ========================================================= */

    if (window.location.hash === "#referee-request") {

        setTimeout(function () {

            const formSection =
                document.getElementById("referee-request");

            if (formSection) {
                formSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        }, 300);
    }


    /* =========================================================
       6. ACTIVE NAVIGATION
       ========================================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll('.nav-menu a[href^="#"]');

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= 150) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    /* =========================================================
       7. HEADER SCROLL EFFECT
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
       8. BACK TO TOP BUTTON
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
       9. FADE-IN ANIMATIONS
       ========================================================= */

    const fadeElements =
        document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            }, {
                threshold: 0.1
            });

        fadeElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        fadeElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    /* =========================================================
       10. CURRENT YEAR
       ========================================================= */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent =
            new Date().getFullYear();
    });


    /* =========================================================
       11. LOAD CV PROFILE DATA
       ========================================================= */

    loadCVData();


    /* =========================================================
       12. LOAD RESEARCH PROJECTS
       ========================================================= */

    loadResearchProjects();


    /* =========================================================
       13. LOAD RESEARCH GRANTS
       ========================================================= */

    loadResearchGrants();

});


/* =============================================================
   11. LOAD CV PROFILE DATA
   ============================================================= */

async function loadCVData() {

    const url =
        new URL("data/cv/profile.json", document.baseURI).href;

    console.log("Loading CV profile:", url);

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

    if (!data || typeof data !== "object") {
        return;
    }

    /*
     * This function intentionally updates only elements
     * that have matching data-cv attributes.
     *
     * Therefore it will not interfere with the existing
     * static content of the website.
     */

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
            element.textContent = value;
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

    if (element && value !== undefined) {
        element.textContent = value;
    }
}


/* =============================================================
   12. LOAD RESEARCH PROJECTS
   ============================================================= */

async function loadResearchProjects() {

    const container =
        document.getElementById("research-projects");

    if (!container) {

        console.warn(
            "Research projects container #research-projects was not found."
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

        /*
         * Your actual research.json structure:
         *
         * {
         *   "projects": [...]
         * }
         */

        if (Array.isArray(data)) {

            projects = data;

        } else if (Array.isArray(data.projects)) {

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

function renderResearchProjects(
    projects,
    container
) {

    container.innerHTML = projects.map(function (project) {

        /*
         * IMPORTANT:
         * Your research.json uses "project_entity"
         * as the project title.
         */

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
            <article class="research-project-card">

                <div class="research-project-content">

                    <div class="research-project-header">

                        <h3>
                            ${escapeHTML(title)}
                        </h3>

                        ${
                            year
                                ? `<span class="research-project-year">
                                    ${escapeHTML(year)}
                                   </span>`
                                : ""
                        }

                    </div>

                    ${
                        role
                            ? `<p class="research-project-role">
                                <strong>
                                    ${escapeHTML(role)}
                                </strong>
                               </p>`
                            : ""
                    }

                    ${
                        description
                            ? `<p>
                                ${escapeHTML(description)}
                               </p>`
                            : ""
                    }

                    ${
                        funder
                            ? `<p class="research-project-funder">
                                <strong>Funder:</strong>
                                ${escapeHTML(funder)}
                               </p>`
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
        document.getElementById("research-projects");

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
   13. LOAD RESEARCH GRANTS
   ============================================================= */

async function loadResearchGrants() {

    const container =
        document.getElementById("research-grants");

    if (!container) {

        console.warn(
            "Research grants container #research-grants was not found."
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

        /*
         * Your actual profile.json contains:
         *
         * "research_grants": [...]
         */

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

    container.innerHTML = grants.map(function (grant) {

        /*
         * Your profile.json stores each grant as a string.
         */

        if (typeof grant === "string") {

            return `
                <article class="research-grant-card">

                    <p>
                        ${escapeHTML(grant)}
                    </p>

                </article>
            `;
        }


        /*
         * Also support object-based grant data
         * for future CV automation.
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

        return `
            <article class="research-grant-card">

                <h3>
                    ${escapeHTML(title)}
                </h3>

                ${
                    funder
                        ? `<p>
                            <strong>Funder:</strong>
                            ${escapeHTML(funder)}
                           </p>`
                        : ""
                }

                ${
                    amount
                        ? `<p>
                            <strong>Amount:</strong>
                            ${escapeHTML(amount)}
                           </p>`
                        : ""
                }

                ${
                    year
                        ? `<p>
                            <strong>Year:</strong>
                            ${escapeHTML(year)}
                           </p>`
                        : ""
                }

            </article>
        `;

    }).join("");

}


/* =============================================================
   RESEARCH GRANT FALLBACK
   ============================================================= */

function showGrantFallback(message) {

    const container =
        document.getElementById("research-grants");

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

    if (value === null || value === undefined) {
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
   GLOBAL REFEREE FORM FUNCTION
   ============================================================= */

window.showRefereeRequestForm =
    function () {

        const formSection =
            document.getElementById("referee-request");

        if (formSection) {

            formSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };


/* =============================================================
   END OF MAIN.JS
   ============================================================= */

