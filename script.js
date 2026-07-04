document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE NAVIGATION
    ========================= */

    const toggle = document.querySelector(".mobile-toggle");
    const nav = document.querySelector("nav");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });

        // Close menu when clicking a link (mobile UX fix)
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
            });
        });
    }

    /* =========================
       SCROLL REVEAL (SECTIONS)
    ========================= */

    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.15
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    /* =========================
       SMOOTH SCROLL (NAV LINKS)
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    /* =========================
       CONTACT FORM (FRONTEND ONLY)
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
