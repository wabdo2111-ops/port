// ============================
// LOADING SCREEN
// ============================

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {
        loader.classList.add("hide");
    }, 1200);

});


// ============================
// MOBILE MENU
// ============================

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", function () {

    nav.classList.toggle("active");

});


// ============================
// CLOSE MENU AFTER CLICK
// ============================

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("active");

    });

});


// ============================
// LOVE LETTER
// ============================

const envelope = document.getElementById("envelope");
const hiddenLetter = document.getElementById("hiddenLetter");

envelope.addEventListener("click", function () {

    envelope.classList.toggle("open");

    hiddenLetter.classList.toggle("show");

});


// ============================
// BUTTON SCROLL
// ============================

const shopButton = document.querySelector(".main-btn");

shopButton.addEventListener("click", function () {

    document.getElementById("story").scrollIntoView({
        behavior: "smooth"
    });

});


// ============================
// SCROLL ANIMATION
// ============================

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {
        threshold: 0.15
    }

);


sections.forEach(function (section) {

    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "1s ease";

    observer.observe(section);

});