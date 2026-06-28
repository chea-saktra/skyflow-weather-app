const menuOverlay = document.querySelector(".menu-overlay");
const sideMenu = document.querySelector(".side-menu");
const currentWeather = document.querySelector(".current-weather");
const weatherDetails = document.querySelector(".weather-details");
const forecast = document.querySelector(".forecast");
const favoritesPanel = document.querySelector(".favorites-panel");
const favToggleBtn = document.getElementById("fav-toggle");

function toggleSideMenu() {
  sideMenu.classList.toggle("is-active");
  menuOverlay.classList.toggle("is-active");
}

function navigateTo(targetHref) {
  currentWeather.classList.add("is-hidden");
  weatherDetails.classList.add("is-hidden");
  forecast.classList.add("is-hidden");
  favoritesPanel.classList.add("is-hidden");

  if (targetHref === "#home") {
    currentWeather.classList.remove("is-hidden");
    weatherDetails.classList.remove("is-hidden");
    forecast.classList.remove("is-hidden");
  } else if (targetHref === "#favorites") {
    favoritesPanel.classList.remove("is-hidden");
  } else if (targetHref === "#history") {
    console.log("Histroy section clicked");
  } else if (targetHref === "#settings") {
    console.log("Settings section clicked");
  }

  if (sideMenu && menuOverlay) {
    sideMenu.classList.remove("is-active");
    menuOverlay.classList.remove("is-active");
  }
}

function handleAddToFavorites() {
  const location = document.querySelector(".mobile-header__location");
  const cityName = location ? location.textContent.trim() : "Phnom Penh";
  const isAdded = favToggleBtn.classList.contains("is-favorite");

  if (!isAdded) {
    favToggleBtn.classList.add("is-favorite");
    favToggleBtn.style.color = "#ffca28";
  } else {
    favToggleBtn.classList.remove("is-favorite");
    favToggleBtn.style.color = "inherit";
  }
}

export { navigateTo, toggleSideMenu, handleAddToFavorites };
