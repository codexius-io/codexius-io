document.addEventListener("DOMContentLoaded", () => {

    /* MOBILE NAV TOGGLE (FIXED) */
    const toggle = document.querySelector(".mobile-toggle");
    const nav = document.querySelector("nav");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }

    /* SMOOTH SCROLL */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
            }

            // close mobile menu after click
            if (nav) nav.classList.remove("active");
        });
    });

    /* SCROLL ANIMATION */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
                entry.target.style.transition = "0.6s ease";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".section, .service-card, .project-card, .pricing-card").forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";
        observer.observe(el);
    });

});
