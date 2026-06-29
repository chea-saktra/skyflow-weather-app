const menuOverlay = document.querySelector(".menu-overlay");
const sideMenu = document.querySelector(".side-menu");
const currentWeather = document.querySelector(".current-weather");
const weatherDetails = document.querySelector(".weather-details");
const forecastSection = document.querySelector(".forecast");
const favoritesPanel = document.querySelector(".favorites-panel");
const favToggleBtn = document.getElementById("fav-toggle");

function toggleSideMenu() {
  sideMenu.classList.toggle("is-active");
  menuOverlay.classList.toggle("is-active");
}

function navigateTo(targetHref) {
  currentWeather.classList.add("is-hidden");
  weatherDetails.classList.add("is-hidden");
  forecastSection.classList.add("is-hidden");
  favoritesPanel.classList.add("is-hidden");

  if (targetHref === "#home") {
    currentWeather.classList.remove("is-hidden");
    weatherDetails.classList.remove("is-hidden");
    forecastSection.classList.remove("is-hidden");
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

const locationTitle = document.querySelector(".mobile-header__location");
const currentTemp = document.querySelector(".current-weather__temperature");
const currentStatus = document.querySelector(".current-weather__status");
const currentIcon = document.querySelector(".current-weather__img");
const humidityText = document.querySelector(".weather-details__humidity");
const windText = document.querySelector(".weather-details__wind");
const feelsLikeText = document.querySelector(".weather-details__feels-like");
const forecastList = document.querySelector(".forecast__list");

const weatherIconMap = {
  "01d": "Sunny.png",
  "01n": "Night.png",

  "02d": "Partly_Cloudy.png",
  "02n": "Night.png",
  "03d": "Partly_Cloudy.png",
  "03n": "Night.png",
  "04d": "Partly_Cloudy.png",
  "04n": "Night.png",

  "09d": "Rainy.png",
  "09n": "Rainy.png",
  "10d": "Rainy_with_Sun.png",
  "10n": "Rainy.png",

  "11d": "Thunderstorm.png",
  "11n": "Lightning.png",

  "13d": "Sonwfall.png",
  "13n": "Snow.png",
  "13s": "Sleet.png",

  "50d": "Light_Drizzle.png",
  "50n": "Light_Drizzle.png",
};

const updateWeatherUI = (data) => {
  if (!data) return;

  const { current, forecast } = data;

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
    const iconCode = current.weather[0].icon;
    const localIconName = weatherIconMap[iconCode] || "Sunny.png";
    currentIcon.src = `../../src/assets/weather-icons/${localIconName}`;
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

  if (forecastList && forecast.list) {
    forecastList.innerHTML = ``;

    const todayDateStr = new Date(current.dt * 1000).toISOString().split("T")[0];

    const daysGroup = {};
    forecast.list.forEach((item) => {
      const dateKey = item.dt_txt.split(" ")[0];

      if (dateKey === todayDateStr) return;

      if (!daysGroup[dateKey]) {
        daysGroup[dateKey] = [];
      }
      daysGroup[dateKey].push(item);
    });

    Object.keys(daysGroup)
      .slice(0.5)
      .forEach((dateKey) => {
        const listForDay = daysGroup[dateKey];

        let maxTemp = -Infinity;
        let minTemp = Infinity;

        const midIndex = Math.floor(listForDay.length / 2);
        const representativeItem = listForDay[midIndex];

        listForDay.forEach((item) => {
          if (item.main.temp_max > maxTemp) maxTemp = item.main.temp_max;
          if (item.main.temp_min < minTemp) minTemp = item.main.temp_min;
        });

        const dateObj = new Date(representativeItem.dt * 1000);
        const dayOptions = { weekday: "short", representativeItem: "numeric" };
        const formattedDay = dateObj.toLocaleDateString("en-US", dayOptions);
        const iconCode = representativeItem.weather[0].icon;
        const localIconName = weatherIconMap[iconCode] || "Sunny.png";

        const li = document.createElement("li");
        const time = document.createElement("time");
        const img = document.createElement("img");
        const forecastTemps = document.createElement("div");
        const maxTempSpan = document.createElement("span");
        const minTempSpan = document.createElement("span");

        li.classList.add("forecast__item");
        time.setAttribute("datetime", `${representativeItem.dt_txt.split(" ")[0]}`);
        time.classList.add("forecast__day");
        time.textContent = formattedDay;

        img.src = `../../src/assets/weather-icons/${localIconName}`;
        img.alt = representativeItem.weather[0].main;
        img.classList.add("forecast__custom-icon");

        forecastTemps.classList.add("forecast__temps");

        maxTempSpan.classList.add("forecast__temp", "forecast__temp--max");
        maxTempSpan.textContent = `${Math.round(maxTemp)}°`;

        minTempSpan.classList.add("forecast__temp", "forecast__temp--min");
        minTempSpan.textContent = `${Math.round(minTemp)}°`;

        forecastTemps.append(maxTempSpan, minTempSpan);
        li.append(time, img, forecastTemps);
        forecastList.append(li);
      });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

const mobileHeader = document.querySelector(".mobile-header");
const searchPanel = document.querySelector(".search-panel");
const searchInput = document.getElementById("search-input");

const toggleSearchMode = (isSearchActive) => {
  if (!mobileHeader || !searchPanel) return;

  if (isSearchActive) {
    mobileHeader.classList.add("is-hidden");
    searchPanel.classList.remove("is-hidden");
    if (searchInput) searchInput.focus();
  } else {
    mobileHeader.classList.remove("is-hidden");
    searchPanel.classList.add("is-hidden");
  }
};

export { navigateTo, toggleSideMenu, handleAddToFavorites, updateWeatherUI, toggleSearchMode };
