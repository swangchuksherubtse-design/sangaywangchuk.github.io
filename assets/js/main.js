```javascript
/* =========================================================
   main.js
   Sangay Wangchuk Academic Profile
   CV AUTOMATION + NAVIGATION + RESEARCH PROJECTS + GRANTS
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

        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });
    }


    /* =====================================================
       2. SMOOTH SCROLLING
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                const header =
                    document.querySelector("header");

                const headerHeight =
                    header ? header.offsetHeight : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                history.replaceState(
                    null,
                    "",
                    targetId
                );
            }
        });
    });


    /* =====================================================
       3. ACTIVE NAVIGATION LINK ON SCROLL
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 160;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }
        });

        navigationLinks.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       4. HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector("header");

    const updateHeader = () => {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();


    /* =====================================================
       5. BACK TO TOP BUTTON
       ===================================================== */

    const backToTop =
        document.querySelector(
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

        window.addEventListener(
            "scroll",
            toggleBackToTop
        );

        toggleBackToTop();

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }


    /* =====================================================
       6. FADE-IN ANIMATION
       ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".fade-in, .reveal, .animate-on-scroll"
        );

    if (
        "IntersectionObserver" in window &&
        animatedElements.length
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observerInstance.unobserve(
                                entry.target
                            );
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

    const currentYear =
        new Date().getFullYear();

    document.querySelectorAll(
        "#currentYear, .current-year"
    ).forEach((element) => {

        element.textContent =
            currentYear;
    });


    /* =====================================================
       8. LOAD CV PROFILE DATA
       ===================================================== */

    loadCVData();


    /* =====================================================
       9. LOAD RESEARCH PROJECTS
       ===================================================== */

    loadResearchProjects();


    /* =====================================================
       10. LOAD RESEARCH GRANTS
       ===================================================== */

    loadResearchGrants();

});


/* =========================================================
   CV / PROFILE DATA LOADER
   ========================================================= */

async function loadCVData() {

    try {

        const response =
            await fetch(
                "data/cv/profile.json",
                {
                    cache: "no-store"
                }
            );

        if (!response.ok) {

            throw new Error(
                `Profile data request failed: ${response.status}`
            );
        }

        const profileData =
            await response.json();

        console.log(
            "CV profile data loaded successfully."
        );

        updateCVContent(profileData);

    } catch (error) {

        console.warn(
            "CV profile data could not be loaded. Static website content will remain active.",
            error
        );
    }
}


/* =========================================================
   UPDATE CV-BASED CONTENT
   ========================================================= */

function updateCVContent(data) {

    if (
        !data ||
        typeof data !== "object"
    ) {
        return;
    }


    /* -----------------------------------------------------
       DATA-CV-FIELD ELEMENTS
       ----------------------------------------------------- */

    document
        .querySelectorAll("[data-cv-field]")
        .forEach((element) => {

            const field =
                element.getAttribute(
                    "data-cv-field"
                );

            if (!field) {
                return;
            }

            const value =
                getNestedValue(
                    data,
                    field
                );

            if (
                value !== undefined &&
                value !== null &&
                typeof value !== "object"
            ) {

                element.textContent =
                    value;
            }
        });


    /* -----------------------------------------------------
       PUBLICATION COUNT
       ----------------------------------------------------- */

    updateStatistic(
        data,
        "publication_count",
        [
            '[data-stat="publications"]',
            "#publicationCount"
        ]
    );


    /* -----------------------------------------------------
       PROJECT COUNT
       ----------------------------------------------------- */

    updateStatistic(
        data,
        "research_project_count",
        [
            '[data-stat="projects"]',
            "#projectCount"
        ]
    );
}


/* =========================================================
   NESTED VALUE HELPER
   ========================================================= */

function getNestedValue(
    object,
    path
) {

    if (
        !object ||
        !path
    ) {
        return undefined;
    }

    return path
        .split(".")
        .reduce(
            (current, key) => {

                if (
                    current === undefined ||
                    current === null
                ) {
                    return undefined;
                }

                return current[key];

            },
            object
        );
}


/* =========================================================
   UPDATE STATISTIC
   ========================================================= */

function updateStatistic(
    data,
    key,
    selectors
) {

    const value =
        getNestedValue(
            data,
            key
        );

    if (
        value === undefined ||
        value === null
    ) {
        return;
    }

    selectors.forEach((selector) => {

        document
            .querySelectorAll(selector)
            .forEach((element) => {

                element.textContent =
                    value;
            });
    });
}


/* =========================================================
   11. RESEARCH PROJECT LOADER
   ========================================================= */

async function loadResearchProjects() {

    /*
     * IMPORTANT:
     *
     * This MUST match index.html:
     *
     * id="research-projects-list"
     */

    const projectContainer =
        document.querySelector(
            "#research-projects-list"
        );

    if (!projectContainer) {

        console.warn(
            "Research project container #research-projects-list was not found."
        );

        return;
    }


    if (
        projectContainer.dataset.loaded ===
        "true"
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                "data/cv/research.json",
                {
                    cache: "no-store"
                }
            );

        if (!response.ok) {

            throw new Error(
                `Research data request failed: ${response.status}`
            );
        }


        const researchData =
            await response.json();


        console.log(
            "research.json loaded successfully."
        );


        /*
         * Expected structure:
         *
         * {
         *   "source": "...",
         *   "projects": [...],
         *   "reports": [...],
         *   "submitted_manuscripts": [...],
         *   "phd_thesis": [...]
         * }
         */

        const projects =
            Array.isArray(
                researchData.projects
            )
                ? researchData.projects
                : [];


        if (!projects.length) {

            throw new Error(
                "research.json was loaded, but no projects were found."
            );
        }


        renderResearchProjects(
            projects,
            projectContainer
        );


        projectContainer.dataset.loaded =
            "true";


        console.log(
            `Successfully loaded ${projects.length} research projects.`
        );


    } catch (error) {

        console.error(
            "Unable to load research projects:",
            error
        );


        showResearchFallback(
            projectContainer
        );
    }
}


/* =========================================================
   12. RENDER RESEARCH PROJECTS
   ========================================================= */

function renderResearchProjects(
    projects,
    container
) {

    if (
        !Array.isArray(projects) ||
        !projects.length
    ) {

        showResearchFallback(
            container
        );

        return;
    }


    container.innerHTML = "";


    projects.forEach((project, index) => {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "project";


        const number =
            String(index + 1).padStart(
                2,
                "0"
            );


        const title =
            project.project_entity ||
            project.title ||
            project.project ||
            "Research Project";


        const role =
            project.role ||
            "";


        const description =
            project.description ||
            "";


        const funder =
            project.funder ||
            project.funding_agency ||
            project.client ||
            "";


        const year =
            project.year ||
            project.date ||
            "";


        card.innerHTML = `

            <div class="project-no">
                ${escapeHTML(number)}
            </div>

            <div>

                ${
                    year
                        ? `
                            <p class="project-kicker">
                                ${escapeHTML(year)}
                            </p>
                          `
                        : ""
                }

                <h3>
                    ${escapeHTML(title)}
                </h3>

                ${
                    role
                        ? `
                            <p>
                                <strong>
                                    ${escapeHTML(role)}
                                </strong>
                            </p>
                          `
                        : ""
                }

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
                                <strong>Funder / Client:</strong>
                                ${escapeHTML(funder)}
                            </p>
                          `
                        : ""
                }

            </div>

        `;


        container.appendChild(
            card
        );
    });
}


/* =========================================================
   13. RESEARCH PROJECT FALLBACK
   ========================================================= */

function showResearchFallback(
    container
) {

    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="research-status">

            <p>
                Research projects are currently being updated.
            </p>

        </div>

    `;
}


/* =========================================================
   14. RESEARCH GRANTS LOADER
   ========================================================= */

async function loadResearchGrants() {

    /*
     * This MUST match index.html:
     *
     * id="research-grants-list"
     */

    const grantContainer =
        document.querySelector(
            "#research-grants-list"
        );

    if (!grantContainer) {

        console.warn(
            "Research grant container #research-grants-list was not found."
        );

        return;
    }


    if (
        grantContainer.dataset.loaded ===
        "true"
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                "data/cv/profile.json",
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `Profile data request failed: ${response.status}`
            );
        }


        const profileData =
            await response.json();


        /*
         * IMPORTANT:
         *
         * In the current profile.json,
         * research_grants is an ARRAY OF STRINGS.
         *
         * Example:
         *
         * "research_grants": [
         *   "Secured Ngultrum 522,588.00 from ...",
         *   "Secured Ngultrum 3,714,150.00 from ...",
         *   ...
         * ]
         */

        const grants =
            Array.isArray(
                profileData.research_grants
            )
                ? profileData.research_grants
                : [];


        if (!grants.length) {

            throw new Error(
                "profile.json was loaded, but no research grants were found."
            );
        }


        renderResearchGrants(
            grants,
            grantContainer
        );


        grantContainer.dataset.loaded =
            "true";


        console.log(
            `Successfully loaded ${grants.length} research grants from profile.json.`
        );


    } catch (error) {

        console.error(
            "Unable to load research grants:",
            error
        );


        showGrantFallback(
            grantContainer
        );
    }
}


/* =========================================================
   15. RENDER RESEARCH GRANTS
   ========================================================= */

function renderResearchGrants(
    grants,
    container
) {

    if (
        !Array.isArray(grants) ||
        !grants.length
    ) {

        showGrantFallback(
            container
        );

        return;
    }


    /*
     * Clear the original:
     *
     * "Loading research grants…"
     *
     * message.
     */

    container.innerHTML = "";


    grants.forEach((grant, index) => {

        /*
         * Each current grant is a plain string.
         */

        const grantText =
            typeof grant === "string"
                ? grant.trim()
                : "";


        if (!grantText) {
            return;
        }


        const card =
            document.createElement(
                "article"
            );


        /*
         * Use the same project-card structure
         * already used successfully by the
         * Projects & Consultancy section.
         */

        card.className =
            "project";


        const number =
            String(index + 1).padStart(
                2,
                "0"
            );


        /*
         * Extract the funding amount.
         *
         * Supported formats:
         *
         * Ngultrum 522,588.00
         * Ngultrum 3,714,150.00
         * Nu 20000
         */

        const amountMatch =
            grantText.match(
                /(?:Ngultrum|Nu\.?)\s*[\d,]+(?:\.\d+)?/i
            );


        const amount =
            amountMatch
                ? amountMatch[0]
                : "";


        /*
         * Extract the year / year range when
         * present.
         *
         * Examples:
         *
         * 2025
         * 2025-2026
         * 2020-2021
         */

        const yearMatch =
            grantText.match(
                /\b20\d{2}(?:\s*[-–]\s*20\d{2})?\b/
            );


        const year =
            yearMatch
                ? yearMatch[0]
                : "";


        /*
         * Determine the funding organisation
         * from the wording of the CV entry.
         */

        let funder = "";


        if (
            /Dorjilung Hydropower Project Limited/i
                .test(grantText)
        ) {

            funder =
                "Dorjilung Hydropower Project Limited (DHPL)";

        } else if (
            /Bhutan Power Corporation/i
                .test(grantText)
        ) {

            funder =
                "Bhutan Power Corporation (BPC)";

        } else if (
            /Sherubtse Thorim Lobdra Research Grant/i
                .test(grantText)
        ) {

            funder =
                "Sherubtse Thorim Lobdra Research Grant (STLRG)";

        } else if (
            /Annual College Research Grant/i
                .test(grantText)
        ) {

            funder =
                "Annual College Research Grant (ACRG)";

        } else if (
            /Automation Test Entry/i
                .test(grantText)
        ) {

            funder =
                "CV-to-Website Synchronization Test";

        }


        /*
         * Create a clean grant description.
         *
         * The original CV sentence is retained so
         * no substantive information is lost.
         */

        const description =
            grantText;


        card.innerHTML = `

            <div class="project-no">
                ${escapeHTML(number)}
            </div>

            <div>

                <p class="project-kicker">
                    RESEARCH GRANT
                    ${
                        year
                            ? ` · ${escapeHTML(year)}`
                            : ""
                    }
                </p>


                ${
                    amount
                        ? `
                            <h3>
                                ${escapeHTML(amount)}
                            </h3>
                          `
                        : `
                            <h3>
                                Research Grant
                            </h3>
                          `
                }


                <p>
                    ${escapeHTML(description)}
                </p>


                <div class="tags">

                    ${
                        funder
                            ? `
                                <span>
                                    ${escapeHTML(funder)}
                                </span>
                              `
                            : `
                                <span>
                                    Research Funding
                                </span>
                              `
                    }


                    ${
                        amount
                            ? `
                                <span>
                                    ${escapeHTML(amount)}
                                </span>
                              `
                            : ""
                    }


                    ${
                        year
                            ? `
                                <span>
                                    ${escapeHTML(year)}
                                </span>
                              `
                            : ""
                    }

                </div>

            </div>

        `;


        container.appendChild(
            card
        );
    });


    /*
     * If no valid grant strings were found,
     * display the fallback message.
     */

    if (!container.children.length) {

        showGrantFallback(
            container
        );
    }
}


/* =========================================================
   16. RESEARCH GRANT FALLBACK
   ========================================================= */

function showGrantFallback(
    container
) {

    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="research-status">

            <p>
                Research grants are currently being updated.
            </p>

        </div>

    `;
}


/* =========================================================
   17. HTML ESCAPE FUNCTION
   ========================================================= */

function escapeHTML(value) {

    if (
        value === undefined ||
        value === null
    ) {
        return "";
    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   18. PUBLIC API
   ========================================================= */

window.loadCVData =
    loadCVData;

window.loadResearchProjects =
    loadResearchProjects;

window.loadResearchGrants =
    loadResearchGrants;

window.renderResearchProjects =
    renderResearchProjects;

window.renderResearchGrants =
    renderResearchGrants;
```
