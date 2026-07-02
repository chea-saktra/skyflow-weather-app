import { getIconUrl } from "../utils/helpers";

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

  if (locationTitle) {
    const i = document.createElement("i");
    i.dataset.lucide = "map-pin";
    locationTitle.textContent = current.name + " ";
    locationTitle.append(i);
  }
  if (currentTitle) {
    const i = document.createElement("i");
    i.dataset.lucide = "map-pin";
    currentTitle.textContent = current.name + " ";
    currentTitle.append(i);
  }
  if (currentDateText) {
    const localTime = new Date((current.dt + current.timezone) * 1000);

    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(localTime);

    currentDateText.textContent = formattedDate.replace(" at ", " . ");
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
