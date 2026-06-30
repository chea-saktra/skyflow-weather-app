import { fetchWeatherData } from "./modules/api";
import {
  checkFavoritesStatus,
  handleAddToFavorites,
  navigateTo,
  renderFavoritesList,
  toggleSearchMode,
  toggleSideMenu,
  updateWeatherUI,
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
  link.addEventListener("click", (e) => {
    e.preventDefault();

    menuLinks.forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");

    const targetHref = link.getAttribute("href");
    navigateTo(targetHref);

    if (targetHref === "#favorites") {
      renderFavoritesList();
    }
  });
});

if (favToggleBtn) {
  favToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleAddToFavorites();
  });
}

const searchInput = document.getElementById("search-input");
const searchForm = document.querySelector(".search-panel__form");
const mobileHeader = document.querySelector(".mobile-header");
const searchPanel = document.querySelector(".search-panel");
const locationTitle = document.querySelector(".mobile-header__location");
const btnBack = document.querySelector(".search-panel__btn-back");
const btnClear = document.querySelector(".search-panel__btn-clear");

const initApp = async () => {
  const defaultCity = "Phnom Penh";
  const weatherData = await fetchWeatherData(defaultCity);
  updateWeatherUI(weatherData);
  checkFavoritesStatus(defaultCity);
};

initApp();

if (locationTitle) {
  locationTitle.addEventListener("click", (e) => {
    toggleSearchMode(true);
  });
}

if (btnBack) {
  btnBack.addEventListener("click", () => {
    toggleSearchMode(false);
  });
}

if (btnClear) {
  btnClear.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.value = "";
    searchInput.focus();
  });
}

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = searchInput.value.trim();
    if (city) {
      const weatherData = await fetchWeatherData(city);
      updateWeatherUI(weatherData);
      checkFavoritesStatus(weatherData.current.name);
      toggleSearchMode(false);
      searchInput.value = "";
    }
  });
}

const backBtn = document.querySelector(".favorites-panel__btn--back");

if (backBtn) {
  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("#home");
  });
}
