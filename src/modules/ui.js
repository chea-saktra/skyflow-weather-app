const sideMenu = document.querySelector(".side-menu");
const currentWeather = document.querySelector(".current-weather");
const weatherDetails = document.querySelector(".weather-details");
const forecast = document.querySelector(".forecast");
const favoritesPanel = document.querySelector(".favorites-panel");
const favToggleBtn = document.getElementById("fav-toggle");

function toggleSideMenu() {
  sideMenu.classList.toggle("is-active");
}

function openFavoritesSection() {
  currentWeather.classList.add("is-hidden");
  weatherDetails.classList.add("is-hidden");
  forecast.classList.add("is-hidden");
  favoritesPanel.classList.remove("is-hidden");
  sideMenu.classList.remove("is-active");
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

export { openFavoritesSection, toggleSideMenu, handleAddToFavorites };
