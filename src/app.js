import { updateCurrentWeatherUI, updateFavButtonUl } from "./components/CurrentWeather";
import { updateFavoritesUI } from "./components/Favorites";
import { updateForecastUI } from "./components/Forecast";
import { initNavbar } from "./components/Navbar";
import { initSidebar, switchDOMVisibility } from "./components/Sidebar";
import { fetchWeatherData } from "./utils/api";
import { addFavorites, isFavorite, removeFavorite } from "./utils/storage";

let currentCityName = "Phnom Penh";

export const loadCityData = async (city) => {
  const data = await fetchWeatherData(city);
  if (!data) return;

  currentCityName = data.current.name;

  updateCurrentWeatherUI(data.current);

  updateForecastUI(data.forecast, data.current.dt);

  updateFavButtonUl(isFavorite(currentCityName));

  if (window.lucide) window.lucide.createIcons();
};

export const initApp = () => {
  initNavbar((city) => loadCityData(city));

  initSidebar(async (targetHref) => {
    switchDOMVisibility(targetHref);

    if (targetHref === "#favorites") {
      await updateFavoritesUI((clickedCity) => {
        switchDOMVisibility("#home");

        const menuLinks = document.querySelectorAll(".side-menu__link");
        menuLinks.forEach((link) => {
          if (link.getAttribute("href") === "#home") link.classList.add("is-active");
          else link.classList.remove("is-active");
        });

        loadCityData(clickedCity);
      });
    }
  });

  const favToggleBtn = document.getElementById("fav-toggle");
  if (favToggleBtn) {
    favToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (isFavorite(currentCityName)) {
        removeFavorite(currentCityName);
        updateFavButtonUl(false);
      } else {
        addFavorites(currentCityName);
        updateFavButtonUl(true);
      }
    });
  }
  loadCityData(currentCityName);
};
