import { getIconUrl } from "../utils/helpers";
import {
  convertCelsiusToFahrenheit,
  convertMetersPerSecondToKmh,
  convertMetersPerSecondToMph,
  formatDate,
  formatTemperature,
  getTemperatureUnit,
  getWindSpeedUnit,
} from "../utils/settings";

export const updateCurrentWeatherUI = (current) => {
  const locationTitle = document.querySelector(".mobile-header__location");
  const currentTitle = document.querySelector(".current-weather__title");
  const currentDateText = document.querySelector(".current-weather__date");
  const currentTemp = document.querySelector(".current-weather__temperature");
  const currentStatus = document.querySelector(".current-weather__status");
  const currentIcon = document.querySelector(".current-weather__img");
  const humidityText = document.querySelector(".weather-details__humidity");
  const windText = document.querySelector(".weather-details__wind");
  const feelsLikeText = document.querySelector(".weather-details__feels-like");

  const appendMapPin = (element) => {
    if (!element) return;
    const i = document.createElement("i");
    i.dataset.lucide = "map-pin";
    element.textContent = current.name + "";
    element.append(i);
  };

  appendMapPin(locationTitle);
  appendMapPin(currentTitle);

  if (currentDateText) {
    const utcTime = new Date();

    currentDateText.textContent = formatDate(utcTime, current.timezone);
  }

  if (currentTemp) {
    const unit = getTemperatureUnit().toUpperCase();
    const tempValue =
      unit === "F"
        ? convertCelsiusToFahrenheit(current.main.temp)
        : Math.round(current.main.temp);
    const sup = document.createElement("sup");

    sup.textContent = `°${unit}`;
    currentTemp.textContent = tempValue;
    currentTemp.append(sup);
  }

  if (currentStatus) {
    const statusText = current.weather[0].description;
    currentStatus.textContent =
      statusText.at(0).toUpperCase() + statusText.slice(1);
  }

  if (currentIcon) {
    currentIcon.src = getIconUrl(current.weather[0].icon);
    currentIcon.alt = current.weather[0].main;
  }

  if (humidityText) {
    humidityText.textContent = `${current.main.humidity}%`;
  }

  if (windText) {
    const windUnit = getWindSpeedUnit().toLowerCase();
    let windSpeed = 0;
    let unitLabel = "";

    if (windUnit === "mph") {
      windSpeed = convertMetersPerSecondToMph(current.wind.speed);
      unitLabel = "mph";
    } else {
      windSpeed = convertMetersPerSecondToKmh(current.wind.speed);
      unitLabel = "km/h";
    }

    windText.textContent = `${windSpeed} ${unitLabel}`;
  }

  if (feelsLikeText) {
    feelsLikeText.textContent = formatTemperature(current.main.feels_like);
  }
};

export const updateFavButtonUl = (isFav) => {
  const mobileFavToggleBtn = document.getElementById("fav-toggle");
  const desktopFavToggleBtn = document.getElementById("desktop-fav-btn");

  if (mobileFavToggleBtn) {
    if (isFav) {
      mobileFavToggleBtn.style.color = "#ffca28";
    } else {
      mobileFavToggleBtn.style.color = "inherit";
    }
  }

  if (desktopFavToggleBtn) {
    const desktopText = desktopFavToggleBtn.querySelector("span");
    if (isFav) {
      desktopFavToggleBtn.classList.add("is-favorite");
      if (desktopText) desktopText.textContent = "Remove from Favorites";
    } else {
      desktopFavToggleBtn.classList.remove("is-favorite");
      if (desktopText) desktopText.textContent = "Add to Favorites";
    }
  }
};
