/* =========================================================
   main.js
   Sangay Wangchuk Academic Profile

   CV AUTOMATION
   NAVIGATION
   RESEARCH PROJECTS
   RESEARCH GRANTS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    console.log("main.js started successfully.");

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
       5. BACK TO TOP
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
       8. START CV AUTOMATION
       ===================================================== */

    loadCVData();


    /* =====================================================
       9. START RESEARCH PROJECT LOADER
       ===================================================== */

    loadResearchProjects();


    /* =====================================================
       10. START RESEARCH GRANT LOADER
       ===================================================== */

    loadResearchGrants();

});


/* =========================================================
   11. CV PROFILE DATA LOADER
   ========================================================= */

async function loadCVData() {

    const profileURL =
        new URL(
            "data/cv/profile.json",
            document.baseURI
        ).href;

    console.log(
        "Loading CV profile:",
        profileURL
    );

    try {

        const response =
            await fetch(
                profileURL,
                {
                    cache: "no-store"
                }
            );

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status} while loading profile.json`
            );
        }

        const profileData =
            await response.json();

        console.log(
            "CV profile data loaded successfully.",
            profileData
        );

        updateCVContent(profileData);

    } catch (error) {

        console.error(
            "CV profile data could not be loaded:",
            error
        );
    }
}


/* =========================================================
   12. UPDATE CV CONTENT
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
   13. NESTED VALUE HELPER
   ========================================================= */

function getNestedValue(object, path) {

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
   14. UPDATE STATISTIC
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
   15. RESEARCH PROJECT LOADER
   ========================================================= */

async function loadResearchProjects() {

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

    console.log(
        "Research project container found."
    );


    projectContainer.innerHTML = `
        <p class="research-projects-loading">
            Loading research projects…
        </p>
    `;


    const researchURL =
        new URL(
            "data/cv/research.json",
            document.baseURI
        ).href;

    console.log(
        "Loading research data:",
        researchURL
    );


    try {

        const response =
            await fetch(
                researchURL,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status} while loading research.json`
            );
        }


        const researchData =
            await response.json();


        console.log(
            "research.json loaded successfully.",
            researchData
        );


        const projects =
            Array.isArray(
                researchData.projects
            )
                ? researchData.projects
                : [];


        if (!projects.length) {

            throw new Error(
                "research.json contains no projects array or the array is empty."
            );
        }


        renderResearchProjects(
            projects,
            projectContainer
        );


        projectContainer.dataset.loaded =
            "true";


        console.log(
            `Successfully rendered ${projects.length} research projects.`
        );


    } catch (error) {

        console.error(
            "Unable to load research projects:",
            error
        );


        showResearchFallback(
            projectContainer,
            error
        );
    }
}


/* =========================================================
   16. RENDER RESEARCH PROJECTS
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
            project.name ||
            "Research Project";


        const role =
            project.role ||
            project.position ||
            "";


        const description =
            project.description ||
            project.details ||
            "";


        const funder =
            project.funder ||
            project.funding_agency ||
            project.client ||
            project.agency ||
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
                                <strong>
                                    Funder / Client:
                                </strong>
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
   17. PROJECT FALLBACK
   ========================================================= */

function showResearchFallback(
    container,
    error
) {

    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="research-status">

            <p>
                Research projects could not be loaded.
            </p>

            <small>
                Please check the CV automation data file.
            </small>

        </div>

    `;


    console.error(
        "Research project loading failed.",
        error || ""
    );
}


/* =========================================================
   18. RESEARCH GRANT LOADER
   ========================================================= */

async function loadResearchGrants() {

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

    console.log(
        "Research grant container found."
    );


    grantContainer.innerHTML = `
        <p class="research-grants-loading">
            Loading research grants…
        </p>
    `;


    const profileURL =
        new URL(
            "data/cv/profile.json",
            document.baseURI
        ).href;


    console.log(
        "Loading grant data:",
        profileURL
    );


    try {

        const response =
            await fetch(
                profileURL,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status} while loading profile.json`
            );
        }


        const profileData =
            await response.json();


        console.log(
            "profile.json loaded for grants.",
            profileData
        );


        /*
         * =================================================
         * SUPPORT ALL CURRENT AUTOMATION NAMES
         * =================================================
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
            "Detected research grants:",
            grants
        );


        if (!grants.length) {

            throw new Error(
                "No research grants were found in profile.json."
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
            grantContainer,
            error
        );
    }
}


/* =========================================================
   19. RENDER RESEARCH GRANTS
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


    container.innerHTML = "";


    grants.forEach((grant, index) => {

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


        /*
         * =================================================
         * PLAIN STRING GRANT
         * =================================================
         *
         * Current CV automation stores grants as strings.
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
                        RESEARCH GRANT
                    </p>

                    <p>
                        ${escapeHTML(grant)}
                    </p>

                </div>

            `;


            container.appendChild(card);

            return;
        }


        /*
         * =================================================
         * STRUCTURED GRANT OBJECT
         * =================================================
         */

        if (
            grant &&
            typeof grant === "object"
        ) {

            const title =
                grant.title ||
                grant.project_entity ||
                grant.project ||
                grant.name ||
                "";


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

                    ${
                        title
                            ? `
                                <h3>
                                    ${escapeHTML(title)}
                                </h3>
                              `
                            : ""
                    }

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
                                    <strong>
                                        Funder:
                                    </strong>
                                    ${escapeHTML(funder)}
                                </p>
                              `
                            : ""
                    }

                    ${
                        amount
                            ? `
                                <p>
                                    <strong>
                                        Funding:
                                    </strong>
                                    ${escapeHTML(amount)}
                                </p>
                              `
                            : ""
                    }

                </div>

            `;


            container.appendChild(card);

            return;
        }


        /*
         * =================================================
         * UNKNOWN DATA TYPE
         * =================================================
         */

        card.innerHTML = `

            <div class="project-no">
                ${escapeHTML(number)}
            </div>

            <div>

                <p class="project-kicker">
                    RESEARCH GRANT
                </p>

                <p>
                    Grant information available in CV data.
                </p>

            </div>

        `;


        container.appendChild(card);
    });
}


/* =========================================================
   20. GRANT FALLBACK
   ========================================================= */

function showGrantFallback(
    container,
    error
) {

    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="research-status">

            <p>
                Research grants could not be loaded.
            </p>

            <small>
                Please check the CV automation data file.
            </small>

        </div>

    `;


    console.error(
        "Research grant loading failed.",
        error || ""
    );
}


/* =========================================================
   21. HTML ESCAPE
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
   22. PUBLIC API
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
