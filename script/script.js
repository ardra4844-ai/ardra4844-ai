/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});


/* Close mobile menu after clicking a link */

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    updateThemeIcon();
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";

    localStorage.setItem("portfolio-theme", theme);

    updateThemeIcon();
});


function updateThemeIcon() {

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("light-theme")) {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    } else {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }
}


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".project-card, .skill-category, .detail-card, " +
    ".timeline-item, .education-card, .organization-card"
);


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   TYPEWRITER EFFECT
========================================================= */

const roles = [
    "Software Developer",
    "Technology Enthusiast",
    "Problem Solver",
    "Application Developer"
];

const roleElement = document.querySelector(".hero h2 span");

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeRole() {

    if (!roleElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        roleElement.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeRole, 1800);

            return;
        }

    } else {

        roleElement.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

        }

    }

    const speed = deleting ? 45 : 80;

    setTimeout(typeRole, speed);
}


setTimeout(typeRole, 1200);


/* =========================================================
   ADD REVEAL ANIMATION STYLES
========================================================= */

const animationStyles = document.createElement("style");

animationStyles.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(25px);
        transition:
            opacity 0.6s ease,
            transform 0.6s ease;
    }

    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(animationStyles);
