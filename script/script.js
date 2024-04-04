/**
 * Global Announcement Close function
 */
const crossButton = document.querySelector("#cross-button");
const announcementDiv = document.querySelector(".announcement");
crossButton.addEventListener("click", (e) => {
  e.preventDefault();
  announcementDiv.style.transform = "scaleY(0)";
  setTimeout(() => {
    announcementDiv.style.display = "none";
  }, 200);
});
/**
 * Mobile Menu Open Close Functionality
 */
const hamburgerMenu = document.querySelector("#hamburger-menu");
const hamburgerClose = document.querySelector("#hamburger-close");
const mobileNavDiv = document.querySelector(".mobile-menu");
/**
 * Opening Mobile Menu
 */
hamburgerMenu.addEventListener("click", () => {
  mobileNavDiv.style.transform = "scaleY(1)";
  hamburgerMenu.style.display = "none";
  hamburgerClose.style.display = "block";
});
/**
 * Closing Mobile Menu
 */
hamburgerClose.addEventListener("click", () => {
  mobileNavDiv.style.transform = "scaleY(0)";
  hamburgerMenu.style.display = "block";
  hamburgerClose.style.display = "none";
  menuWrapper.style.opacity = 0;
});

/**
 * Menu Wrapper
 */
const menuWrapper = document.querySelector(".menu-wrapper");

/**
 * Mealtime Link Functionality
 */
const mealtimeButton = document.querySelector(".mealtime-button");
const mealtimeMenuWrapper = document.querySelector(".mealtime-menu-wrapper");
mealtimeButton.addEventListener("click", () => {
  if (Array.from(mealtimeButton.classList).includes("active")) {
    mealtimeButton.classList.remove("active");
    mealtimeMenuWrapper.style.opacity = 0;
  } else {
    setMenuVisibility("mealtime");
  }
});

const setMenuVisibility = (menu) => {
  if (menu === "mealtime") {
    playtimeButton.classList.remove("active");
    playtimeMenuWrapper.style.opacity = 0;
    bathtimeButton.classList.remove("active");
    bathtimeMenuWrapper.style.opacity = 0;
    mealtimeButton.classList.add("active");
    mealtimeMenuWrapper.style.opacity = 1;
  } else if (menu === "playtime") {
    mealtimeButton.classList.remove("active");
    mealtimeMenuWrapper.style.opacity = 0;
    bathtimeButton.classList.remove("active");
    bathtimeMenuWrapper.style.opacity = 0;
    playtimeButton.classList.add("active");
    playtimeMenuWrapper.style.opacity = 1;
  } else if (menu === "bathtime") {
    mealtimeButton.classList.remove("active");
    mealtimeMenuWrapper.style.opacity = 0;
    playtimeButton.classList.remove("active");
    playtimeMenuWrapper.style.opacity = 0;
    bathtimeButton.classList.add("active");
    bathtimeMenuWrapper.style.opacity = 1;
  }
};

/**
 * Playtime Link Functionality
 */
const playtimeMenuWrapper = document.querySelector(".playtime-menu-wrapper");
const playtimeButton = document.querySelector(".playtime-button");
playtimeButton.addEventListener("click", () => {
  if (Array.from(playtimeButton.classList).includes("active")) {
    playtimeButton.classList.remove("active");
    playtimeMenuWrapper.style.opacity = 0;
  } else {
    setMenuVisibility("playtime");
  }
});
/**
 * Bathtime Link Functionality
 */
const bathtimeMenuWrapper = document.querySelector(".bathtime-menu-wrapper");
const bathtimeButton = document.querySelector(".bathtime-button");
bathtimeButton.addEventListener("click", () => {
  if (Array.from(bathtimeButton.classList).includes("active")) {
    bathtimeButton.classList.remove("active");
    bathtimeMenuWrapper.style.opacity = 0;
  } else {
    setMenuVisibility("bathtime");
  }
});

/*
 *carousel
 */
// const nextButton = document.querySelectorAll(".next");
// const prevButton = document.querySelectorAll(".prev");
// const slidingDiv = document.querySelector(".sliding-div");
// const card = document.querySelector(".Card");

// const numberOfSlides = document.querySelectorAll(".Card").length;
// let leftPosition = 0;
// let currentSlide = 1;
// console.log(numberOfSlides);
// const cardWith = card.offsetWidth;
// const gapBetweenCards = 800 / 3 + 10;

// nextButton.addEventListener("click", () => {
//   if (currentSlide < numberOfSlides) {
//     leftPosition -= cardWith + gapBetweenCards;
//     slidingDiv.style.left = leftPosition + "px";
//     currentSlide++;
//   }
//   if (currentSlide === numberOfSlides) {
//     leftPosition = 0;
//     slidingDiv.style.left = 0;
//     currentSlide = 0;
//   }
// });

// prevButton.addEventListener("click", () => {
//   if (currentSlide > 0) {
//     leftPosition += cardWith + gapBetweenCards;
//     slidingDiv.style.left = leftPosition + "px";
//     currentSlide--;
//   }
// });
const nextButtons = document.querySelectorAll(".next");
const prevButtons = document.querySelectorAll(".prev");
const slidingDivs = document.querySelectorAll(".sliding-div");
console.log(slidingDivs);
const card = document.querySelector(".Card");
let positions = [];

Array.from(slidingDivs).map((slide, idx) =>
  positions.push({ leftPosition: 0, currentSlide: 1 })
);

console.log(positions);

const cardWith = card.offsetWidth;
const gapBetweenCards = 10;
function scrollLeft(slidingDiv, idx) {
  console.log(idx);
  const numberOfSlides = slidingDiv.querySelectorAll(".Card").length;
  if (positions[idx].currentSlide < numberOfSlides) {
    positions[idx].leftPosition -= cardWith + gapBetweenCards;
    slidingDiv.style.left = positions[idx].leftPosition + "px";
    positions[idx].currentSlide++;
  }
  if (positions[idx].currentSlide === numberOfSlides) {
    positions[idx].leftPosition = 0;
    slidingDiv.style.left = 0;
    positions[idx].currentSlide = 0;
  }
}

nextButtons.forEach((nextBtn, idx) =>
  nextBtn.addEventListener("click", () => scrollLeft(slidingDivs[idx], idx))
);
console.log(nextButtons);
