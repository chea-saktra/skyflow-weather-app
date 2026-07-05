import {
  updateCurrentWeatherUI,
  updateFavButtonUl,
} from "./components/CurrentWeather";
import { updateFavoritesUI } from "./components/Favorites";
import { updateForecastUI } from "./components/Forecast";
import { updateHistoryUI } from "./components/History";
import { initNavbar } from "./components/Navbar";
import { updateSettingsUI } from "./components/Settings";
import { initSidebar, switchDOMVisibility } from "./components/Sidebar";
import { fetchWeatherData } from "./utils/api";
import { addHistoryItem } from "./utils/history";
import { addFavorites, isFavorite, removeFavorite } from "./utils/favorite";
import {
  applyThemeUI,
  formatTemperature,
  getNotificationsStatus,
  sendWeatherNotification,
} from "./utils/settings";
import { getIconUrl } from "./utils/helpers";

let currentCityName = "Phnom Penh";

const handleFavoriteCityClick = (clickedCity) => {
  switchDOMVisibility("#home");
  const menuLinks = document.querySelectorAll(".side-menu__link");
  menuLinks.forEach((link) => {
    if (link.getAttribute("href") === "#home") link.classList.add("is-active");
    else link.classList.remove("is-active");
  });
  loadCityData(clickedCity);
};

const reRenderCurrentData = () => {
  if (window.currentWeatherData) {
    updateCurrentWeatherUI(window.currentWeatherData.current);
    updateForecastUI(
      window.currentWeatherData.forecast,
      window.currentWeatherData.current.dt,
    );
  }
};

export const loadCityData = async (city) => {
  const data = await fetchWeatherData(city);
  if (!data) return;

  window.currentWeatherData = data;

  currentCityName = data.current.name;
  updateCurrentWeatherUI(data.current);
  updateForecastUI(data.forecast, data.current.dt);
  updateFavButtonUl(isFavorite(currentCityName));
  addHistoryItem(data.current);

  if (data && data.current) {
    const title = `Weather Update: ${data.current.name}`;
    const formattedTemp = formatTemperature(data.current.main.temp);
    const body = `Current temperature is ${formattedTemp} with ${data.current.weather[0].description}.`;
    const icon = getIconUrl(data.current.weather[0].icon);
    if (
      getNotificationsStatus() &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      sendWeatherNotification(title, body, icon);
    }
  }

  if (window.lucide) window.lucide.createIcons();
};

export const initApp = () => {
  applyThemeUI();

  initNavbar((city) => loadCityData(city));

  initSidebar(async (targetHref) => {
    switchDOMVisibility(targetHref);

    if (targetHref === "#favorites") {
      await updateFavoritesUI(handleFavoriteCityClick);
    } else if (targetHref === "#history") {
      await updateHistoryUI(handleFavoriteCityClick);
    } else if (targetHref === "#settings") {
      updateSettingsUI(reRenderCurrentData);
    }
  });

  const toggleFavorite = async () => {
    if (isFavorite(currentCityName)) {
      removeFavorite(currentCityName);
      updateFavButtonUl(false);
    } else {
      addFavorites(currentCityName);
      updateFavButtonUl(true);
    }

    const favoritesPanel = document.querySelector(".favorites-panel");
    if (favoritesPanel && !favoritesPanel.classList.contains("is-hidden")) {
      await updateFavoritesUI(handleFavoriteCityClick);
    }
  };

  const favToggleBtn = document.getElementById("fav-toggle");
  if (favToggleBtn) {
    favToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleFavorite();
    });
  }

  const desktopFavBtn = document.getElementById("desktop-fav-btn");
  if (desktopFavBtn) {
    desktopFavBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleFavorite();
    });
  }
  loadCityData(currentCityName);
};
