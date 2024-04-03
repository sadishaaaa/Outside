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

mealtimeButton.addEventListener("click", () => {
  menuWrapper.style.opacity = 1;
});

/**
 * Carousel
 */
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Inserting copies of the last few cards to beginning of carousel to result infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Inserting copies of the first few cards to end of carousel to result infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first card
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Adding event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const scrollAmount = firstCardWidth + 1;
    carousel.scrollLeft += btn.id == "left" ? -scrollAmount : scrollAmount;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth / 3;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (carousel.scrollLeft >= carousel.scrollWidth / 1.5) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth / 3;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
