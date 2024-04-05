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
 * Menu drpdownn
 */

// Selecting buttons and menu elements
const mealtimeButton = document.querySelector(".mealtime-button");
const playtimeButton = document.querySelector(".playtime-button");
const bathtimeButton = document.querySelector(".bathtime-button");

const menuWrapper = document.getElementById("menu-wrapper");
const menuTitle = document.getElementById("menu-title");
const menuItems = document.getElementById("menu-items");
const slidingDiv = document.getElementById("sliding-div");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

// Variables for tracking active menu item and current slide index
let activeMenuItem = null;
let currentSlideIndex = 0;

// Function to get button based on menu item
const getButtonByMenuItem = (menu) => {
  switch (menu) {
    case "mealtime":
      return mealtimeButton;
    case "playtime":
      return playtimeButton;
    case "bathtime":
      return bathtimeButton;
    default:
      throw new Error("Invalid menu type");
  }
};

// Function to reset sliding div position
const resetSlidingDivPosition = () => {
  slidingDiv.style.left = 0;
  currentSlideIndex = 0;
};

// Function to toggle active menu item change
const toggleActiveMenuItemChange = (menuItem) => {
  if (menuItem === activeMenuItem) {
    return;
  }

  if (activeMenuItem) {
    const oldActiveMenuButton = getButtonByMenuItem(activeMenuItem);
    oldActiveMenuButton.classList.remove("active");
  }

  const newActiveMenuButton = getButtonByMenuItem(menuItem);
  newActiveMenuButton.classList.add("active");

  activeMenuItem = menuItem;
  resetSlidingDivPosition();
};

// Function to display mega menu dropdown
const displayMegaMenuDropdown = (menuItem) => {
  toggleActiveMenuItemChange(menuItem);

  const content = CONTENTS[menuItem];
  menuTitle.textContent = content.title;
  menuItems.innerHTML = "";
  slidingDiv.innerHTML = "";
  content.subMenuItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    menuItems.appendChild(li);
  });
  content.carouselItems.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <div class="card-img">
        <img src="${item.img}" alt="">
      </div>
      <div class="card-img-info">
        <div class="card-title">${item.title}</div>
        <div class="product-name">${item.product}</div>
      </div>
      `;
    slidingDiv.appendChild(div);
  });

  menuWrapper.style.opacity = 1;
};

// Function to hide mega menu dropdown
const hideMegaMenuDropdown = () => {
  menuTitle.textContent = "";
  menuItems.innerHTML = "";
  slidingDiv.innerHTML = "";
  menuWrapper.style.opacity = 0;

  activeMenuItem = null;
  resetSlidingDivPosition();
};

// Function to handle menu item click
const handleMenuItemClick = (menuItem) => {
  if (menuItem === activeMenuItem) {
    hideMegaMenuDropdown();
    return;
  }
  displayMegaMenuDropdown(menuItem);
};

// Event listeners for menu item buttons
mealtimeButton.addEventListener("click", () => handleMenuItemClick("mealtime"));
playtimeButton.addEventListener("click", () => handleMenuItemClick("playtime"));
bathtimeButton.addEventListener("click", () => handleMenuItemClick("bathtime"));

// Constants for carousel functionality
const gapBetweenCards = 10;
const cardWidth = 818 / 4; //calculating card width, in px

// Function to handle next button click for carousel
const handleNext = () => {
  const numberOfSlides = slidingDiv.querySelectorAll(".card").length;
  currentSlideIndex++;
  if (currentSlideIndex < numberOfSlides) {
    const leftPosition =
      parseFloat(slidingDiv.style.left || 0) - (cardWidth + gapBetweenCards);
    slidingDiv.style.left = leftPosition + "px";
  } else if (currentSlideIndex === numberOfSlides) {
    slidingDiv.style.left = 0;
    currentSlideIndex = 0;
  }
};

// Function to handle previous button click for carousel
const handlePrev = () => {
  const numberOfSlides = slidingDiv.querySelectorAll(".card").length;
  if (currentSlideIndex > 0) {
    const leftPosition =
      parseFloat(slidingDiv.style.left || 0) + (cardWidth + gapBetweenCards);
    slidingDiv.style.left = leftPosition + "px";
    currentSlideIndex--;
  } else if (currentSlideIndex === 0) {
    slidingDiv.style.left =
      -((cardWidth + gapBetweenCards) * (numberOfSlides - 1)) + "px";
    currentSlideIndex = numberOfSlides - 1;
  }
};

// Event listeners for next and previous buttons
nextButton.addEventListener("click", handleNext);
prevButton.addEventListener("click", handlePrev);
