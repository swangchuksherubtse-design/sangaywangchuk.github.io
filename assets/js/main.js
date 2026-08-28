javascript
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

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
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

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );
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

            backToTop.classList.toggle(
                "show",
                window.scrollY > 500
            );
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

                        if (entry.isIntersecting) {

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
       8. LOAD CV PROFILE
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
            "CV profile data could not be loaded.",
            error
        );
    }
}


/* =========================================================
   UPDATE CV CONTENT
   ========================================================= */

function updateCVContent(data) {

    if (
        !data ||
        typeof data !== "object"
    ) {
        return;
    }

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

function getNestedValue(object, path) {

    if (!object || !path) {
        return undefined;
    }

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

    const projectContainer =
        document.querySelector(
            "#research-projects-list"
        );

    if (!projectContainer) {

        console.warn(
            "Research project container not found."
        );

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

        const projects =
            Array.isArray(
                researchData.projects
            )
                ? researchData.projects
                : [];

        if (!projects.length) {

            throw new Error(
                "No research projects found."
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

        showResearchFallback(container);
        return;
    }

    container.innerHTML = "";

    projects.forEach((project, index) => {

        const card =
            document.createElement("article");

        card.className = "project";

        const number =
            String(index + 1).padStart(2, "0");

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

        container.appendChild(card);
    });
}


/* =========================================================
   13. PROJECT FALLBACK
   ========================================================= */

function showResearchFallback(container) {

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
     * IMPORTANT:
     *
     * We support BOTH possible container IDs:
     *
     * #research-grants-list
     * #researchGrants
     *
     * This prevents the HTML/JavaScript ID mismatch
     * that can cause "Loading research grants..." to
     * remain permanently visible.
     */

    const grantContainer =
        document.querySelector(
            "#research-grants-list"
        ) ||
        document.querySelector(
            "#researchGrants"
        );

    if (!grantContainer) {

        console.error(
            "GRANTS ERROR: Neither #research-grants-list nor #researchGrants was found."
        );

        return;
    }


    /*
     * Remove any existing loading message immediately.
     */

    removeGrantLoadingMessage(
        grantContainer
    );


    try {

        /*
         * The current automation stores grants in:
         *
         * data/cv/profile.json
         *
         * property:
         *
         * research_grants
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


        /*
         * CURRENT JSON STRUCTURE:
         *
         * "research_grants": [
         *     "Secured Ngultrum 522,588.00 ...",
         *     "Secured Ngultrum 3,714,150.00 ...",
         *     "Secured Ngultrum 1,027,950.00 ...",
         *     "Secured Ngultrum 498239.00 ...",
         *     "Secured Ngultrum 200,000 ...",
         *     "Secured Nu 20000 Automation Test Entry ..."
         * ]
         */

        let grants = [];


        if (
            Array.isArray(
                profileData.research_grants
            )
        ) {

            grants =
                profileData.research_grants;

        } else if (
            Array.isArray(
                profileData.grants
            )
        ) {

            grants =
                profileData.grants;

        } else if (
            Array.isArray(
                profileData.researchGrants
            )
        ) {

            grants =
                profileData.researchGrants;

        } else if (
            Array.isArray(
                profileData.research_grant
            )
        ) {

            grants =
                profileData.research_grant;
        }


        console.log(
            "Research grants found:",
            grants
        );


        if (!grants.length) {

            throw new Error(
                "profile.json contains no research_grants."
            );
        }


        renderResearchGrants(
            grants,
            grantContainer
        );


        grantContainer.dataset.loaded =
            "true";


        console.log(
            `Successfully rendered ${grants.length} research grants.`
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
   15. REMOVE GRANT LOADING MESSAGE
   ========================================================= */

function removeGrantLoadingMessage(container) {

    if (!container) {
        return;
    }


    /*
     * Remove loading elements inside the grant container.
     */

    container
        .querySelectorAll(
            ".loading-message, .loading, .loading-grants, #loading-grants"
        )
        .forEach((element) => {

            element.remove();
        });


    /*
     * Also remove plain text loading messages that may
     * have been inserted by the original HTML.
     */

    Array.from(
        container.childNodes
    ).forEach((node) => {

        if (
            node.nodeType === Node.TEXT_NODE &&
            node.textContent
                .toLowerCase()
                .includes("loading research grants")
        ) {

            node.remove();
        }
    });
}


/* =========================================================
   16. RENDER RESEARCH GRANTS
   ========================================================= */

function renderResearchGrants(
    grants,
    container
) {

    if (
        !Array.isArray(grants) ||
        !grants.length
    ) {

        showGrantFallback(container);
        return;
    }


    /*
     * CRITICAL:
     *
     * Clear EVERYTHING currently inside the container.
     *
     * This removes:
     *
     * "01 Research Grant"
     * "02 Research Grant"
     * etc.
     *
     * and:
     *
     * "Loading research grants..."
     */

    container.innerHTML = "";


    grants.forEach((grant, index) => {

        const card =
            document.createElement("article");

        card.className =
            "project";


        const number =
            String(index + 1).padStart(
                2,
                "0"
            );


        /*
         * CURRENT DATA:
         *
         * Every grant is a STRING.
         */

        if (
            typeof grant === "string"
        ) {

            card.innerHTML = `

                <div class="project-no">
                    ${escapeHTML(number)}
                </div>

                <div>

                    <p class="project-kicker">
                        Research Grant
                    </p>

                    <p>
                        ${escapeHTML(grant)}
                    </p>

                </div>

            `;


        } else {

            /*
             * Future-proof support for structured
             * grant objects.
             */

            const title =
                grant.title ||
                grant.project_entity ||
                grant.project ||
                grant.name ||
                "Research Grant";


            const description =
                grant.description ||
                grant.details ||
                "";


            const role =
                grant.role ||
                grant.position ||
                "";


            const funder =
                grant.funder ||
                grant.funding_agency ||
                grant.agency ||
                grant.client ||
                "";


            const amount =
                grant.amount ||
                grant.value ||
                grant.funding ||
                "";


            const year =
                grant.year ||
                grant.date ||
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
                                    <strong>Funder:</strong>
                                    ${escapeHTML(funder)}
                                </p>
                              `
                            : ""
                    }

                    ${
                        amount
                            ? `
                                <p>
                                    <strong>Funding:</strong>
                                    ${escapeHTML(amount)}
                                </p>
                              `
                            : ""
                    }

                </div>
            `;
        }


        container.appendChild(card);
    });
}


/* =========================================================
   17. GRANT FALLBACK
   ========================================================= */

function showGrantFallback(container) {

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
   18. HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {

    if (
        value === undefined ||
        value === null
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


/* =========================================================
   19. PUBLIC API
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

