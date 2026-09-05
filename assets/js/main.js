document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. MOBILE NAVIGATION
       ========================================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");

    if (menuToggle && siteNav) {
        menuToggle.addEventListener("click", () => {
            siteNav.classList.toggle("open");

            const expanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!expanded)
            );
        });

        siteNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                siteNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =========================================================
       2. SMOOTH SCROLLING
       ========================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]:not(.back-to-referees):not([href="#referee-request-form"])'
        )
        .forEach((link) => {

            link.addEventListener("click", function (event) {

                const targetId = this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#" ||
                    targetId === "#referee-request-form"
                ) {
                    return;
                }

                const target = document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header = document.querySelector(".site-header");

                const headerHeight = header
                    ? header.getBoundingClientRect().height
                    : 0;

                const targetTop =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    20;

                window.scrollTo({
                    top: targetTop,
                    behavior: "smooth"
                });

                history.replaceState(
                    null,
                    "",
                    targetId
                );
            });
        });


    /* =========================================================
       3. PROFESSIONAL REFEREE REQUEST FORM
       ========================================================= */

    const refereeForm =
        document.getElementById("referee-request-form");

    const refereeRequestLinks =
        document.querySelectorAll(
            'a[href="#referee-request-form"]'
        );


    function showRefereeRequestForm(event) {

        if (event) {
            event.preventDefault();
        }

        const form =
            document.getElementById("referee-request-form");

        if (!form) {
            return;
        }

        /* Make the form visible */
        form.hidden = false;
        form.removeAttribute("hidden");
        form.setAttribute("aria-hidden", "false");

        /* Scroll to the form after revealing it */
        const header =
            document.querySelector(".site-header");

        const headerHeight = header
            ? header.getBoundingClientRect().height
            : 0;

        const targetTop =
            form.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            20;

        window.scrollTo({
            top: targetTop,
            behavior: "smooth"
        });

        /* Update URL without reloading the page */
        history.replaceState(
            null,
            "",
            "#referee-request-form"
        );

        /* Focus the first field for accessibility */
        setTimeout(() => {

            const firstInput =
                form.querySelector(
                    "input:not([type='hidden']), select, textarea"
                );

            if (firstInput) {
                firstInput.focus();
            }

        }, 500);
    }


    refereeRequestLinks.forEach((link) => {

        link.addEventListener(
            "click",
            showRefereeRequestForm
        );

    });


    /* =========================================================
       4. HIDE REFEREE FORM ON BACK
       ========================================================= */

    window.backToReferees = function () {

        const form =
            document.getElementById("referee-request-form");

        if (form) {
            form.hidden = true;
            form.setAttribute(
                "aria-hidden",
                "true"
            );
        }

        const refereeSection =
            document.getElementById("referees");

        if (!refereeSection) {
            return;
        }

        const header =
            document.querySelector(".site-header");

        const headerHeight = header
            ? header.getBoundingClientRect().height
            : 0;

        const targetTop =
            refereeSection.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            20;

        window.scrollTo({
            top: targetTop,
            behavior: "smooth"
        });

        history.replaceState(
            null,
            "",
            "#referees"
        );
    };


    /* =========================================================
       5. OPEN REFEREE FORM IF DIRECTLY LINKED
       ========================================================= */

    if (
        window.location.hash ===
        "#referee-request-form"
    ) {
        setTimeout(() => {
            showRefereeRequestForm();
        }, 100);
    }


    /* =========================================================
       6. ACTIVE NAVIGATION
       ========================================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            ".site-nav a[href^='#']"
        );

    if (sections.length && navLinks.length) {

        const updateActiveNav = () => {

            const scrollPosition =
                window.scrollY +
                window.innerHeight * 0.35;

            let currentSection = "";

            sections.forEach((section) => {

                const sectionTop =
                    section.offsetTop;

                const sectionBottom =
                    sectionTop +
                    section.offsetHeight;

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionBottom
                ) {
                    currentSection =
                        section.id;
                }

            });

            navLinks.forEach((link) => {

                link.classList.remove("active");

                const href =
                    link.getAttribute("href");

                if (
                    href ===
                    `#${currentSection}`
                ) {
                    link.classList.add("active");
                }

            });
        };

        window.addEventListener(
            "scroll",
            updateActiveNav,
            { passive: true }
        );

        updateActiveNav();
    }


    /* =========================================================
       7. HEADER SCROLL EFFECT
       ========================================================= */

    const header =
        document.querySelector(".site-header");

    if (header) {

        const updateHeader =
            () => {

                if (window.scrollY > 20) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }

            };

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

        updateHeader();
    }


    /* =========================================================
       8. BACK TO TOP
       ========================================================= */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {
                    backToTop.classList.add("show");
                } else {
                    backToTop.classList.remove("show");
                }

            },
            { passive: true }
        );

        backToTop.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* =========================================================
       9. FADE-IN ANIMATIONS
       ========================================================= */

    const fadeElements =
        document.querySelectorAll(
            ".fade-in, .reveal"
        );

    if (
        fadeElements.length &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            obs.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );

        fadeElements.forEach((element) => {
            observer.observe(element);
        });
    }


    /* =========================================================
       10. CURRENT YEAR
       ========================================================= */

    document
        .querySelectorAll("[data-current-year]")
        .forEach((element) => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =========================================================
       11. LOAD CV DATA
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
   LOAD CV DATA
   ============================================================= */

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
                `HTTP ${response.status}`
            );
        }

        const data =
            await response.json();

        updateCVContent(data);

    } catch (error) {

        console.error(
            "Unable to load CV data:",
            error
        );

    }
}


/* =============================================================
   UPDATE CV CONTENT
   ============================================================= */

function updateCVContent(data) {

    if (!data) {
        return;
    }

    document
        .querySelectorAll("[data-cv]")
        .forEach((element) => {

            const key =
                element.getAttribute(
                    "data-cv"
                );

            const value =
                getNestedValue(
                    data,
                    key
                );

            if (
                value !== undefined &&
                value !== null
            ) {

                element.textContent =
                    value;

            }

        });


    /* Update statistics when available */

    updateStatistic(
        "publications",
        getNestedValue(
            data,
            "publication_count"
        )
    );

    updateStatistic(
        "projects",
        getNestedValue(
            data,
            "research_project_count"
        )
    );

    updateStatistic(
        "grants",
        getNestedValue(
            data,
            "research_grant_count"
        )
    );
}


/* =============================================================
   GET NESTED VALUE
   ============================================================= */

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
                    current === null ||
                    current === undefined
                ) {
                    return undefined;
                }

                return current[key];

            },
            object
        );
}


/* =============================================================
   UPDATE STATISTIC
   ============================================================= */

function updateStatistic(
    name,
    value
) {

    if (
        value === undefined ||
        value === null
    ) {
        return;
    }

    const elements =
        document.querySelectorAll(
            `[data-stat="${name}"]`
        );

    elements.forEach((element) => {

        element.textContent =
            value;

    });
}


/* =============================================================
   LOAD RESEARCH PROJECTS
   ============================================================= */

async function loadResearchProjects() {

    const container =
        document.querySelector(
            "#research-projects"
        );

    if (!container) {
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
                `HTTP ${response.status}`
            );
        }

        const data =
            await response.json();

        const projects =
            Array.isArray(data)
                ? data
                : (
                    data.projects ||
                    data.research_projects ||
                    []
                );

        renderResearchProjects(
            projects,
            container
        );

    } catch (error) {

        console.error(
            "Unable to load research projects:",
            error
        );

        showResearchFallback(container);
    }
}


/* =============================================================
   RENDER RESEARCH PROJECTS
   ============================================================= */

function renderResearchProjects(
    projects,
    container
) {

    if (
        !Array.isArray(projects) ||
        projects.length === 0
    ) {

        showResearchFallback(container);
        return;
    }

    container.innerHTML =
        projects
            .map((project) => {

                const role =
                    project.role ||
                    "";

                const title =
                    project.title ||
                    project.project ||
                    project.name ||
                    "";

                const client =
                    project.client ||
                    project.funder ||
                    project.organization ||
                    "";

                const year =
                    project.year ||
                    project.period ||
                    "";

                const description =
                    project.description ||
                    "";

                return `
                    <article class="research-project">
                        <div class="project-meta">
                            ${escapeHTML(role)}
                            ${year
                                ? ` · ${escapeHTML(String(year))}`
                                : ""}
                        </div>

                        <h3>
                            ${escapeHTML(title)}
                        </h3>

                        ${
                            client
                                ? `
                                    <p class="project-client">
                                        ${escapeHTML(client)}
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
                    </article>
                `;

            })
            .join("");
}


/* =============================================================
   RESEARCH FALLBACK
   ============================================================= */

function showResearchFallback(
    container
) {

    container.innerHTML = `
        <p class="data-fallback">
            Research projects are currently being updated.
        </p>
    `;
}


/* =============================================================
   LOAD RESEARCH GRANTS
   ============================================================= */

async function loadResearchGrants() {

    const container =
        document.querySelector(
            "#research-grants"
        );

    if (!container) {
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
                `HTTP ${response.status}`
            );
        }

        const data =
            await response.json();

        const grants =
            Array.isArray(
                data.research_grants
            )
                ? data.research_grants
                : [];

        renderResearchGrants(
            grants,
            container
        );

    } catch (error) {

        console.error(
            "Unable to load research grants:",
            error
        );

        showGrantFallback(container);
    }
}


/* =============================================================
   RENDER RESEARCH GRANTS
   ============================================================= */

function renderResearchGrants(
    grants,
    container
) {

    if (
        !Array.isArray(grants) ||
        grants.length === 0
    ) {

        showGrantFallback(container);
        return;
    }

    container.innerHTML =
        grants
            .map((grant) => {

                /*
                 * Supports both the current simple
                 * string format and future object format.
                 */

                if (
                    typeof grant ===
                    "string"
                ) {

                    return `
                        <article class="grant-item">
                            <p>
                                ${escapeHTML(grant)}
                            </p>
                        </article>
                    `;

                }

                const title =
                    grant.title ||
                    grant.project ||
                    grant.name ||
                    "";

                const funder =
                    grant.funder ||
                    grant.client ||
                    grant.organization ||
                    "";

                const amount =
                    grant.amount ||
                    "";

                const year =
                    grant.year ||
                    grant.period ||
                    "";

                const description =
                    grant.description ||
                    "";

                return `
                    <article class="grant-item">

                        ${
                            funder
                                ? `
                                    <div class="grant-funder">
                                        ${escapeHTML(funder)}
                                    </div>
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
                            amount
                                ? `
                                    <div class="grant-amount">
                                        ${escapeHTML(String(amount))}
                                    </div>
                                  `
                                : ""
                        }

                        ${
                            year
                                ? `
                                    <div class="grant-year">
                                        ${escapeHTML(String(year))}
                                    </div>
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

                    </article>
                `;

            })
            .join("");
}


/* =============================================================
   GRANT FALLBACK
   ============================================================= */

function showGrantFallback(
    container
) {

    container.innerHTML = `
        <p class="data-fallback">
            Research grants are currently being updated.
        </p>
    `;
}


/* =============================================================
   ESCAPE HTML
   ============================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =============================================================
   PUBLIC FUNCTIONS
   ============================================================= */

window.showRefereeRequestForm =
    function () {

        const form =
            document.getElementById(
                "referee-request-form"
            );

        if (!form) {
            return;
        }

        form.hidden = false;
        form.removeAttribute("hidden");
        form.setAttribute(
            "aria-hidden",
            "false"
        );

        history.replaceState(
            null,
            "",
            "#referee-request-form"
        );

        const header =
            document.querySelector(
                ".site-header"
            );

        const headerHeight =
            header
                ? header.getBoundingClientRect().height
                : 0;

        const targetTop =
            form.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            20;

        window.scrollTo({
            top: targetTop,
            behavior: "smooth"
        });
    };
