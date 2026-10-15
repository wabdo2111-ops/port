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


// ==========================
// OUR SOUNDTRACK - MUSIC
// ==========================

const songPlayers = document.querySelectorAll(".song-audio");

songPlayers.forEach((player) => {
    player.addEventListener("play", () => {

        // Pause all other songs
        songPlayers.forEach((otherPlayer) => {
            if (otherPlayer !== player) {
                otherPlayer.pause();
            }
        });

        // Highlight the currently playing card
        document.querySelectorAll(".song-card").forEach((card) => {
            card.classList.remove("is-playing");
        });

        player.closest(".song-card").classList.add("is-playing");
    });

    player.addEventListener("pause", () => {
        const card = player.closest(".song-card");

        if (card && player.paused) {
            card.classList.remove("is-playing");
        }
    });

    player.addEventListener("ended", () => {
        player.closest(".song-card").classList.remove("is-playing");
    });

});


// ==========================
// OUR RELATIONSHIP COUNTER
// ==========================

// غيّر التاريخ ده لتاريخ بداية علاقتكم
// الترتيب: سنة، شهر، يوم، ساعة، دقيقة، ثانية
const relationshipStart = new Date(2026, 1, 11, 0, 0, 0);

function addCalendarMonths(date, monthsToAdd) {
    const result = new Date(date);
    const originalDay = result.getDate();

    result.setDate(1);
    result.setMonth(result.getMonth() + monthsToAdd);

    const lastDay = new Date(
        result.getFullYear(),
        result.getMonth() + 1,
        0
    ).getDate();

    result.setDate(Math.min(originalDay, lastDay));

    return result;
}

function updateRelationshipCounter() {
    const now = new Date();

    // منع ظهور أرقام سالبة لو تاريخ البداية في المستقبل
    if (now < relationshipStart) {
        ["years", "months", "days", "hours", "minutes", "seconds"]
            .forEach(id => {
                document.getElementById(id).textContent = "0";
            });
        return;
    }

    let cursor = new Date(relationshipStart);
    let years = 0;
    let months = 0;

    // حساب السنين الكاملة
    while (addCalendarMonths(cursor, 12) <= now) {
        cursor = addCalendarMonths(cursor, 12);
        years++;
    }

    // حساب الشهور الكاملة المتبقية
    while (addCalendarMonths(cursor, 1) <= now) {
        cursor = addCalendarMonths(cursor, 1);
        months++;
    }

    // حساب الأيام والساعات والدقائق والثواني المتبقية
    let remaining = Math.floor((now - cursor) / 1000);

    const days = Math.floor(remaining / 86400);
    remaining %= 86400;

    const hours = Math.floor(remaining / 3600);
    remaining %= 3600;

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

// تحديث العداد فور فتح الصفحة، وبعدها كل ثانية
updateRelationshipCounter();
setInterval(updateRelationshipCounter, 1000);