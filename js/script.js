
/* =====================================================
   ELVA MAKEUP ACADEMY
   MAIN JAVASCRIPT
   NEXOWEBPY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");
    const preloader = document.getElementById("preloader");

    /* =========================
       PRELOADER
    ========================= */

    const hidePreloader = () => {
        if (preloader) {
            preloader.classList.add("hidden");
        }
    };

    window.addEventListener("load", hidePreloader);

    // Evita dejar bloqueada la página si tarda la carga.
    setTimeout(hidePreloader, 3000);


    /* =========================
       HEADER SCROLL
    ========================= */

    const handleScroll = () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    handleScroll();


    /* =========================
       MOBILE NAVIGATION
    ========================= */

    const closeMenu = () => {

        if (!menuToggle || !navigation) return;

        menuToggle.classList.remove("active");

        navigation.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Abrir menú");

        document.body.classList.remove("menu-open");

    };


    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );

            document.body.classList.toggle("menu-open", isOpen);

        });


        // Cerrar menú al seleccionar una sección.

        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });


        // Cerrar con Escape.

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const navLinks = document.querySelectorAll(".nav-link");

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${entry.target.id}`
                    );

                });

            });

        }, {
            rootMargin: "-35% 0px -55% 0px"
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =========================
       PREVENT EMPTY LINKS
    ========================= */

    document.querySelectorAll('a[href="#"]').forEach(link => {

        link.addEventListener("click", event => {
            event.preventDefault();
        });

    });


    /* =========================
       CONSOLE BRAND
    ========================= */

    console.log(
        "%c ELVA MAKEUP ACADEMY ",
        "background:#211c19;color:#c4a582;padding:12px;font-size:16px;"
    );

    console.log(
        "Beauty is an Art. | Developed by NexoWebPy"
    );

});

/* -------------------------------------------- */
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    const image = document.querySelector(".hero-image");

    if (!hero || !image) return;

    const scroll = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scroll <= heroHeight) {
        image.style.transform = `translateY(${scroll * 0.25}px)`;
    }
});


/* =========================================
   ELVA BEAUTY ACADEMY — MODAL DE CURSOS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("courseModal");

    if (!modal) {
        console.error("ELVA: No se encontró #courseModal");
        return;
    }

    // ELEMENTOS DEL MODAL
    const modalImage = modal.querySelector("#modalImage");
    const modalCategory = modal.querySelector("#modalCategory");
    const modalTitle = modal.querySelector("#modalTitle");
    const modalDescription = modal.querySelector("#modalDescription");
    const modalDuration = modal.querySelector("#modalDuration");
    const modalModality = modal.querySelector("#modalModality");
    const modalProgram = modal.querySelector("#modalProgram");

    const closeButton = modal.querySelector(".course-modal-close");
    const overlay = modal.querySelector(".course-modal-overlay");

    // TARJETAS DEL CARRUSEL
    const cards = document.querySelectorAll("#curso .card");

    let previousOverflow = "";

    // ABRIR MODAL
    function openCourse(card) {

        const image = card.querySelector("img");

        if (image) {
            modalImage.src = image.src;
            modalImage.alt = image.alt;
        }

        modalCategory.textContent =
            card.dataset.category || "ELVA BEAUTY ACADEMY";

        modalTitle.textContent =
            card.dataset.title || "Formación ELVA";

        modalDescription.textContent =
            card.dataset.description || "";

        modalDuration.textContent =
            card.dataset.duration || "Consultar";

        modalModality.textContent =
            card.dataset.modality || "Consultar";

        modalProgram.textContent =
            card.dataset.content || "";

        previousOverflow = document.body.style.overflow;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

        closeButton.focus();

    }

    // CERRAR MODAL
    function closeCourse() {

        modal.classList.remove("active");

        document.body.style.overflow = previousOverflow;

    }

    // EVENTO PARA CADA TARJETA
    cards.forEach(function (card) {

        card.addEventListener("click", function () {

            openCourse(this);

        });

    });

    // BOTÓN X
    if (closeButton) {
        closeButton.addEventListener("click", closeCourse);
    }

    // FONDO OSCURO
    if (overlay) {
        overlay.addEventListener("click", closeCourse);
    }

    // TECLA ESCAPE
    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {
            closeCourse();
        }

    });

    console.log(
        "ELVA: Modal funcionando. Tarjetas encontradas:",
        cards.length
    );

});

/* =========================================
   ELVA — SCROLL REVEAL COURSES
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const elements = document.querySelectorAll(
        ".courses-heading, #curso .wrapper"
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(element => {
        observer.observe(element);
    });

});

/* =========================================
   ELVA — GALERÍA SCROLL REVEAL
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const galleryElements = document.querySelectorAll(
        ".gallery-heading, .gallery-column"
    );

    if (!galleryElements.length) return;

    const galleryObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("gallery-visible");

                    galleryObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    galleryElements.forEach(function (element) {
        galleryObserver.observe(element);
    });

});





/*Contacto------------------------------------------------------------------------------------------------*/

/* =========================================
   ANIMACIÓN DE CONTACTO ELVA
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const contactSection = document.querySelector(".elva-contact");

    if (!contactSection) return;

    const contactObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    contactSection.classList.add("contact-visible");

                    contactObserver.unobserve(contactSection);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    contactObserver.observe(contactSection);

});


/* =========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const year = document.getElementById("footer-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
