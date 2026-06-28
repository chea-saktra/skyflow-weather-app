import { handleAddToFavorites, navigateTo, toggleSideMenu } from "./modules/ui";

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
  link.addEventListener("click", (e) => {
    e.preventDefault();

    menuLinks.forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");

    const targetHref = link.getAttribute("href");
    navigateTo(targetHref);
  });
});

if (favToggleBtn) {
  favToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleAddToFavorites();
  });
}
