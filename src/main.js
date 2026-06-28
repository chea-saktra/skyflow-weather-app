import {
  handleAddToFavorites,
  openFavoritesSection,
  toggleSideMenu,
} from "./modules/ui";

const menuToggleBtn = document.getElementById("menu-toggle");
const menuOverlay = document.querySelector(".menu-overlay");
const sideMenu = document.querySelector(".side-menu");
const favToggleBtn = document.getElementById("fav-toggle");
const menuLinks = document.querySelectorAll(".side-menu__link");

if (menuToggleBtn) {
  menuToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleSideMenu();
  });
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", (e) => {
    e.preventDefault();
    sideMenu.classList.remove("is-active");
    menuOverlay.classList.remove("is-active");
  });
}

menuLinks.forEach((link) => {
  if (link.textContent.trim() === "Favorites") {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openFavoritesSection();
    });
  }
});

if (favToggleBtn) {
  favToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleAddToFavorites();
  });
}
