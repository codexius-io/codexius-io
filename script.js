document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE NAV TOGGLE (STABLE)
    ========================= */

    const toggle = document.querySelector(".mobile-toggle");
    const nav = document.querySelector("nav");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });

        // close menu when clicking a link (mobile UX fix)
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
            });
        });
    }

    /* =========================
       SMOOTH SCROLL (SAFE OFFSET)
    ========================= */

    const headerOffset = 80;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    /* =========================
       SCROLL REVEAL (LIGHTWEIGHT)
    ========================= */

    const revealElements = document.querySelectorAll(
        ".section, .service-card, .project-card, .pricing-card, .card"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });

    /* =========================
       CONTACT FORM UX (NO BACKEND)
    ========================= */

    const form = document.querySelector(".contact-form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const button = form.querySelector("button");

            const originalText = button.textContent;

            button.textContent = "Sending...";

            setTimeout(() => {
                button.textContent = "Message Sent ✓";

                form.reset();

                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);

            }, 1200);
        });
    }

});
