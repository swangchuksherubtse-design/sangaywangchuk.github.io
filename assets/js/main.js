```javascript
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
       4. HEADER SHADOW / SCROLL EFFECT
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
       8. CV / PROFILE DATA LOADER
       
       The automated CV system currently generates:
       
       data/cv/profile.json
       data/cv/publications.json
       data/cv/research.json
       data/cv/cv_text.json
       data/cv/journal_metrics.json
       
       There is no cv_data.json.
       ===================================================== */

    loadCVData();



    /* =====================================================
       9. INITIALISE RESEARCH PROJECTS
       ===================================================== */

    loadResearchProjects();

});



/* =========================================================
   CV / PROFILE DATA LOADER
   ========================================================= */

async function loadCVData() {

    try {

        /*
         * The current automation generates profile.json,
         * not cv_data.json.
         */

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


        updateCVContent(
            profileData
        );


    } catch (error) {

        /*
         * This is intentionally non-fatal.
         *
         * The website should continue displaying its
         * existing static content if profile.json
         * cannot be loaded.
         */

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


    /*
     * Update only elements that explicitly request
     * CV-driven content through data-cv-field.
     *
     * This protects the existing website design.
     */

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
}



/* =========================================================
   NESTED VALUE HELPER
   ========================================================= */

function getNestedValue(
    object,
    path
) {

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
   RESEARCH PROJECT LOADER
   ========================================================= */

async function loadResearchProjects() {

    const projectContainer =
        document.querySelector(
            "#researchProjects"
        );


    /*
     * If the Research Projects container does not
     * exist on the page, stop safely.
     */

    if (!projectContainer) {

        console.warn(
            "Research project container #researchProjects was not found."
        );

        return;
    }



    /*
     * Prevent duplicate loading.
     */

    if (
        projectContainer.dataset.loaded ===
        "true"
    ) {

        return;
    }



    /*
     * Remove an existing loading indicator only
     * when we are ready to process the actual data.
     */

    try {

        /*
         * IMPORTANT:
         *
         * The actual automatically generated file is:
         *
         * data/cv/research.json
         *
         * NOT:
         *
         * data/cv/research_projects.json
         */

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


        /*
         * research.json has this structure:
         *
         * {
         *   "source": "...",
         *   "projects": [...],
         *   "reports": [...],
         *   "submitted_manuscripts": [...],
         *   "phd_thesis": [...]
         * }
         *
         * Therefore we must use:
         *
         * researchData.projects
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
            `Successfully loaded ${projects.length} research projects from data/cv/research.json.`
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
   RENDER RESEARCH PROJECTS
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



    /*
     * Clear the existing loading message/content
     * before rendering the automatically generated
     * project cards.
     */

    container.innerHTML = "";



    projects.forEach((project) => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "project-card";



        /*
         * These are the EXACT field names contained
         * in research.json.
         */

        const title =
            project.project_entity ||
            "Research Project";


        const role =
            project.role ||
            "";


        const description =
            project.description ||
            "";


        const funder =
            project.funder ||
            "";


        const year =
            project.year ||
            "";



        card.innerHTML = `

            <div class="project-card-content">

                ${
                    year
                        ? `
                            <span class="project-year">
                                ${escapeHTML(year)}
                            </span>
                          `
                        : ""
                }


                <h3>
                    ${escapeHTML(title)}
                </h3>


                ${
                    role
                        ? `
                            <p class="project-role">
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
                            <p class="project-funder">
                                <strong>Funder:</strong>
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
   RESEARCH FALLBACK
   ========================================================= */

function showResearchFallback(
    container
) {

    /*
     * Remove common loading indicators.
     */

    const loadingMessage =
        container.querySelector(
            ".loading-message, .loading"
        );


    if (loadingMessage) {

        loadingMessage.remove();
    }



    /*
     * If there is already meaningful content,
     * preserve it.
     */

    if (
        container.children.length > 0 &&
        container.textContent.trim().length > 0
    ) {

        return;
    }



    /*
     * If the JSON cannot be loaded, do NOT leave
     * the page permanently saying:
     *
     * "Loading research projects..."
     */

    container.innerHTML = `

        <div class="research-status">

            <p>
                Research projects are currently being updated.
            </p>

        </div>

    `;
}



/* =========================================================
   HTML ESCAPE FUNCTION
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
   PUBLIC API
   ========================================================= */

window.loadCVData =
    loadCVData;


window.loadResearchProjects =
    loadResearchProjects;


window.renderResearchProjects =
    renderResearchProjects;
```
