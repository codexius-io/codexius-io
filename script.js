document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".mobile-toggle");
    const mobileNav = document.querySelector(".mobile-nav");
    const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav a");

    if (toggle && mobileNav) {
        toggle.addEventListener("click", () => {
            const isOpen = mobileNav.classList.toggle("open");
            document.body.classList.toggle("menu-open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.textContent = isOpen ? "×" : "☰";
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });

            if (mobileNav && mobileNav.classList.contains("open")) {
                mobileNav.classList.remove("open");
                document.body.classList.remove("menu-open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.textContent = "☰";
            }
        });
    });

    const revealItems = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach(item => revealObserver.observe(item));

    const sections = document.querySelectorAll("section[id]");

    const setActiveLink = () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) current = section.id;
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    };

    setActiveLink();
    window.addEventListener("scroll", setActiveLink, { passive: true });

/* ==========================
   CONTACT FORM
========================== */

const form = document.querySelector(".contact-form");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const button = form.querySelector("button");

        button.disabled = true;
        button.textContent = "Sending...";

        const data = new FormData(form);

        const response = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {

            form.reset();

            button.textContent = "✓ Message Sent";

        } else {

            button.textContent = "Something went wrong";

        }

        setTimeout(() => {

            button.disabled = false;
            button.textContent = "Send Message";

        }, 3000);

    });

}
});
