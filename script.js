// ============================================================
// Rupesh K R Portfolio
// Main JavaScript
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // THEME TOGGLE
    // ========================================================

    const themeToggle = document.getElementById("themeToggle");
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");
    const body = document.body;

    function applyTheme(theme) {

        if (theme === "light") {

            body.classList.add("light");

            if (sunIcon) {
                sunIcon.style.display = "none";
            }

            if (moonIcon) {
                moonIcon.style.display = "block";
            }

        } else {

            body.classList.remove("light");

            if (sunIcon) {
                sunIcon.style.display = "block";
            }

            if (moonIcon) {
                moonIcon.style.display = "none";
            }
        }
    }

    const savedTheme =
        localStorage.getItem("theme") || "dark";

    applyTheme(savedTheme);

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const isLight =
                body.classList.contains("light");

            const nextTheme =
                isLight ? "dark" : "light";

            applyTheme(nextTheme);

            localStorage.setItem(
                "theme",
                nextTheme
            );

        });
    }


    // ========================================================
    // MOBILE NAVIGATION
    // ========================================================

    const hamburger =
        document.getElementById("hamburger");

    const navLinks =
        document.getElementById("navLinks");

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("open");

            hamburger.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navLinks.classList.remove("open");

                    hamburger.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });

            });
    }


    // ========================================================
    // TYPEWRITER
    // ========================================================

    const roles = [
        ".NET MAUI Developer",
        "Frontend Developer",
        "Android Developer",
        "Full Stack Engineer"
    ];

    const typewriterEl =
        document.getElementById("typewriter");

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {

        if (!typewriterEl) {
            return;
        }

        const currentRole =
            roles[roleIndex];

        if (!deleting) {

            charIndex++;

            typewriterEl.textContent =
                currentRole.slice(0, charIndex);

            if (charIndex === currentRole.length) {

                deleting = true;

                setTimeout(
                    typeLoop,
                    1400
                );

                return;
            }

        } else {

            charIndex--;

            typewriterEl.textContent =
                currentRole.slice(0, charIndex);

            if (charIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(
            typeLoop,
            deleting ? 45 : 85
        );
    }

    typeLoop();


    // ========================================================
    // PROJECT FILTER
    // ========================================================

    const filterBtns =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");


    function filterProjects(filter) {

        projectCards.forEach(card => {

            const cardTag =
                card.dataset.tag;

            const matches =
                filter === "all" ||
                cardTag === filter;

            card.classList.toggle(
                "show",
                matches
            );

        });
    }


    filterBtns.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterBtns.forEach(btn => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                filterProjects(
                    button.dataset.filter
                );
            }
        );

    });

    filterProjects("all");


    // ========================================================
    // CONTACT FORM
    // ========================================================

    const form =
        document.getElementById("contactForm");

    const formNote =
        document.getElementById("formNote");

    const sendBtn =
        document.getElementById("sendBtn");


    if (form && formNote && sendBtn) {

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                if (
                    sendBtn.classList.contains("loading") ||
                    sendBtn.classList.contains("sent")
                ) {
                    return;
                }


                const actionUrl =
                    form.getAttribute("action");


                const isConfigured =
                    actionUrl &&
                    !actionUrl.includes(
                        "YOUR_FORM_ID"
                    );


                formNote.classList.remove(
                    "error"
                );

                formNote.textContent = "";


                // Check Formspree configuration

                if (!isConfigured) {

                    formNote.classList.add(
                        "error"
                    );

                    formNote.textContent =
                        "Contact form is not connected yet. Add your Formspree Form ID in index.html.";

                    return;
                }


                // Basic browser validation

                if (!form.checkValidity()) {

                    form.reportValidity();

                    return;
                }


                sendBtn.classList.add(
                    "loading"
                );


                try {

                    const response =
                        await fetch(
                            actionUrl,
                            {
                                method: "POST",

                                body:
                                    new FormData(form),

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Form submission failed"
                        );
                    }


                    sendBtn.classList.remove(
                        "loading"
                    );

                    sendBtn.classList.add(
                        "sent"
                    );


                    formNote.classList.remove(
                        "error"
                    );

                    formNote.textContent =
                        "Thanks! Your message has been sent. I'll get back to you soon.";


                    form.reset();


                    setTimeout(
                        () => {

                            sendBtn.classList.remove(
                                "sent"
                            );

                        },
                        2600
                    );

                } catch (error) {

                    console.error(
                        "Contact form error:",
                        error
                    );


                    sendBtn.classList.remove(
                        "loading"
                    );

                    formNote.classList.add(
                        "error"
                    );

                    formNote.textContent =
                        "Something went wrong. Please email me directly instead.";
                }

            }
        );
    }


    // ========================================================
    // STAT COUNTERS
    // ========================================================

    const statNumbers =
        document.querySelectorAll(
            ".stat-number"
        );


    function animateCount(element) {

        const target =
            parseFloat(
                element.dataset.target
            );

        const suffix =
            element.dataset.suffix || "";

        const duration = 1400;

        const startTime =
            performance.now();


        function tick(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.round(
                    target * eased
                );


            element.textContent =
                value + suffix;


            if (progress < 1) {

                requestAnimationFrame(
                    tick
                );

            }

        }


        requestAnimationFrame(tick);
    }


    if ("IntersectionObserver" in window) {

        const statObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCount(
                                    entry.target
                                );

                                statObserver.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );


        statNumbers.forEach(
            element => {

                statObserver.observe(
                    element
                );

            }
        );

    } else {

        statNumbers.forEach(
            animateCount
        );

    }


    // ========================================================
    // FOOTER YEAR
    // ========================================================

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    // ========================================================
    // SCROLL REVEAL
    // ========================================================

    const revealTargets =
        document.querySelectorAll(
            ".card, .tl-card, .goal-box"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";

                                entry.target.style.transform =
                                    "translateY(0)";

                                revealObserver.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        revealTargets.forEach(
            element => {

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(16px)";

                element.style.transition =
                    "opacity .5s ease, transform .5s ease";

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealTargets.forEach(
            element => {

                element.style.opacity =
                    "1";

                element.style.transform =
                    "translateY(0)";

            }
        );
    }


    // ========================================================
    // SCROLL PROGRESS BAR
    // ========================================================

    const progressBar =
        document.querySelector(
            ".top-gradient-bar"
        );


    function updateProgress() {

        if (!progressBar) {
            return;
        }


        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;


        progressBar.style.width =
            percentage + "%";
    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    updateProgress();


    // ========================================================
    // SECTION TITLE ANIMATION
    // ========================================================

    const titleTargets =
        document.querySelectorAll(
            ".section-title"
        );


    if ("IntersectionObserver" in window) {

        const titleObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "in-view"
                                );

                                titleObserver.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.4
                }
            );


        titleTargets.forEach(
            element => {

                titleObserver.observe(
                    element
                );

            }
        );
    }


    // ========================================================
    // NAV SCROLLSPY
    // ========================================================

    const navAnchors =
        document.querySelectorAll(
            ".nav-links a"
        );


    const spySections =
        [...navAnchors]
            .map(anchor => {

                const selector =
                    anchor.getAttribute(
                        "href"
                    );

                return document.querySelector(
                    selector
                );

            })
            .filter(Boolean);


    if ("IntersectionObserver" in window) {

        const spyObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                const sectionId =
                                    "#" +
                                    entry.target.id;


                                const activeLink =
                                    document.querySelector(
                                        `.nav-links a[href="${sectionId}"]`
                                    );


                                if (!activeLink) {
                                    return;
                                }


                                navAnchors.forEach(
                                    link => {

                                        link.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                                activeLink.classList.add(
                                    "active"
                                );
                            }

                        }
                    );

                },
                {
                    rootMargin:
                        "-45% 0px -45% 0px",

                    threshold: 0
                }
            );


        spySections.forEach(
            section => {

                spyObserver.observe(
                    section
                );

            }
        );
    }


    // ========================================================
    // HERO PHOTO TILT
    // ========================================================

    const photoStage =
        document.getElementById(
            "photoStage"
        );

    const photoBox =
        document.getElementById(
            "photoBox"
        );


    if (
        photoStage &&
        photoBox &&
        window.matchMedia(
            "(hover: hover)"
        ).matches
    ) {

        photoStage.addEventListener(
            "mousemove",
            event => {

                const rect =
                    photoStage.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                        rect.width -
                    0.5;


                const y =
                    (event.clientY -
                        rect.top) /
                        rect.height -
                    0.5;


                photoBox.style.transform =
                    `perspective(600px)
                     rotateY(${x * 16}deg)
                     rotateX(${-y * 16}deg)
                     scale(1.03)`;

            }
        );


        photoStage.addEventListener(
            "mouseleave",
            () => {

                photoBox.style.transform =
                    "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";

            }
        );
    }

});