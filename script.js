document.addEventListener("DOMContentLoaded", () => {

    const toggle = document.querySelector(".mobile-toggle");
    const nav = document.querySelector("nav");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.style.display = nav.style.display === "flex" ? "none" : "flex";
            nav.style.flexDirection = "column";
        });
    }

});
