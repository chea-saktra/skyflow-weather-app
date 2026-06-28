import {
  handleAddToFavorites,
  openFavoritesSection,
  toggleSideMenu,
} from "./modules/ui";

const menuToggleBtn = document.getElementById("menu-toggle");
const favToggleBtn = document.getElementById("fav-toggle");
const menuLinks = document.querySelectorAll(".side-menu__link");

if (menuToggleBtn) {
  menuToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleSideMenu();
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
