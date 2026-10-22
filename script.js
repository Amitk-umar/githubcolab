const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        navLinks.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
        navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target.closest("a")) closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) closeMenu();
    });
}

document.querySelectorAll("[data-year]").forEach((year) => {
    year.textContent = new Date().getFullYear();
});

const revealElements = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const subject = `Project enquiry from ${formData.get("name")}`;
        const body = [
            `Name: ${formData.get("name")}`,
            `Email: ${formData.get("email")}`,
            "",
            formData.get("project")
        ].join("\n");

        window.location.href = `mailto:hello@githubcolab.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}