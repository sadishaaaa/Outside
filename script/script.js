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
    mealtimeMenuWrapper.style.display = "none";
  } else {
    setMenuVisibility("mealtime");
  }
});

const setMenuVisibility = (menu) => {
  if (menu === "mealtime") {
    playtimeButton.classList.remove("active");
    playtimeMenuWrapper.style.display = "none";
    bathtimeButton.classList.remove("active");
    bathtimeMenuWrapper.style.display = "none";
    mealtimeButton.classList.add("active");
    mealtimeMenuWrapper.style.display = "flex";
  } else if (menu === "playtime") {
    mealtimeButton.classList.remove("active");
    mealtimeMenuWrapper.style.display = "none";
    bathtimeButton.classList.remove("active");
    bathtimeMenuWrapper.style.display = "none";
    playtimeButton.classList.add("active");
    playtimeMenuWrapper.style.display = "flex";
  } else if (menu === "bathtime") {
    mealtimeButton.classList.remove("active");
    mealtimeMenuWrapper.style.display = "none";
    playtimeButton.classList.remove("active");
    playtimeMenuWrapper.style.display = "none";
    bathtimeButton.classList.add("active");
    bathtimeMenuWrapper.style.display = "flex";
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
    playtimeMenuWrapper.style.display = "none";
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
    bathtimeMenuWrapper.style.display = "none";
  } else {
    setMenuVisibility("bathtime");
  }
});

/*
 *carousel
 */
const nextButtons = document.querySelectorAll(".next");
const prevButtons = document.querySelectorAll(".prev");
const slidingDivs = document.querySelectorAll(".sliding-div");

let positions = [];

Array.from(slidingDivs).map((slide, idx) =>
  positions.push({ leftPosition: 0, currentSlide: 1 })
);

const gapBetweenCards = 10;
const cardWidth = 818 / 4; //card width  in px
function scrollLeft(slidingDiv, idx) {
  const numberOfSlides = slidingDiv.querySelectorAll(".Card").length;
  if (positions[idx].currentSlide < numberOfSlides) {
    positions[idx].leftPosition -= cardWidth + gapBetweenCards;
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

// detects window resize and hides the menu if the window is less than 768px
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    menuWrapper.style.display = "none";
  } else {
    menuWrapper.style.display = "flex";
  }
});
