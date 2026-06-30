import { getIconUrl } from "../utils/helpers";

export const updateCurrentWeatherUI = (current) => {
  const locationTitle = document.querySelector(".mobile-header__location");
  const currentTemp = document.querySelector(".current-weather__temperature");
  const currentStatus = document.querySelector(".current-weather__status");
  const currentIcon = document.querySelector(".current-weather__img");
  const humidityText = document.querySelector(".weather-details__humidity");
  const windText = document.querySelector(".weather-details__wind");
  const feelsLikeText = document.querySelector(".weather-details__feels-like");

  if (locationTitle) {
    const i = document.createElement("i");
    i.dataset.lucide = "map-pin";
    locationTitle.textContent = current.name + " ";
    locationTitle.append(i);
  }

  if (currentTemp) {
    const sup = document.createElement("sup");
    sup.textContent = "°C";
    currentTemp.textContent = Math.round(current.main.temp);
    currentTemp.append(sup);
  }

  if (currentStatus) {
    const statusText = current.weather[0].description;
    currentStatus.textContent = statusText.at(0).toUpperCase() + statusText.slice(1);
  }

  if (currentIcon) {
    currentIcon.src = getIconUrl(current.weather[0].icon);
    currentIcon.alt = current.weather[0].main;
  }

  if (humidityText) {
    humidityText.textContent = `${current.main.humidity}%`;
  }

  if (windText) {
    const windSpeedKmH = Math.round(current.wind.speed * 3.6);
    windText.textContent = `${windSpeedKmH} km/h`;
  }

  if (feelsLikeText) {
    feelsLikeText.textContent = `${Math.round(current.main.feels_like)}°C`;
  }

};

export const updateFavButtonUl = (isFav) => {
  const favToggleBtn = document.getElementById("fav-toggle");
  if (!favToggleBtn) return;

  if (isFav) {
    favToggleBtn.classList.add("is-favorite");
    favToggleBtn.style.color = "#ffca28";
  } else {
    favToggleBtn.classList.remove("is-favorite");
    favToggleBtn.style.color = "inherit";
  }
};
