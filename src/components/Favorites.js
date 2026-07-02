import { fetchWeatherData } from "../utils/api";
import { getIconUrl } from "../utils/helpers";
import { getFavorites } from "../utils/storage";
import { switchDOMVisibility } from "./Sidebar";

export const updateFavoritesUI = async (onCityClick) => {
  const favoritesPanel = document.querySelector(".favorites-panel");
  if (!favoritesPanel) return;
  favoritesPanel.innerHTML = "";

  const favorites = getFavorites();

  const header = document.createElement("header");
  const btnBack = document.createElement("button");
  const backIcon = document.createElement("i");
  const titleHeader = document.createElement("h1");
  const btnAdd = document.createElement("button");

  header.classList.add("favorites-panel__header");

  btnBack.classList.add("favorites-panel__btn--back");
  btnBack.setAttribute("aria-label", "Go back to home");

  backIcon.dataset.lucide = "arrow-left";
  btnBack.addEventListener("click", () => {
    switchDOMVisibility("#home");
    const menuLinks = document.querySelectorAll(".side-menu__link");
    menuLinks.forEach((link) => {
      if (link.getAttribute("href") === "#home") link.classList.add("is-active");
      else link.classList.remove("is-active");
    });
  });

  titleHeader.classList.add("favorites-panel__title");
  titleHeader.textContent = "My Favorites";

  btnAdd.classList.add("favorites-panel__btn--add-city");

  btnAdd.textContent = "Add City";
  btnAdd.addEventListener("click", () => {
    switchDOMVisibility("#home");

    const menuLinks = document.querySelectorAll(".side-menu__link");
    menuLinks.forEach((link) => {
      if (link.getAttribute("href") === "#home") link.classList.add("is-active");
      else link.classList.remove("is-active");
    });

    if (typeof window.openSearchPanel === "function") window.openSearchPanel();
  });

  btnBack.append(backIcon);
  header.append(btnBack, titleHeader, btnAdd);
  favoritesPanel.append(header);

  if (favorites.length === 0) {
    return;
  }

  const ul = document.createElement("ul");
  ul.classList.add("favorites-panel__list");

  for (const city of favorites) {
    const data = await fetchWeatherData(city);
    if (!data) continue;

    const { current } = data;

    const li = document.createElement("li");
    const article = document.createElement("article");
    const button = document.createElement("button");
    const infoContainer = document.createElement("div");
    const img = document.createElement("img");
    const nameCity = document.createElement("h2");
    const countryText = document.createElement("p");
    const tempElement = document.createElement("data");

    li.classList.add("favorites-panel__item");

    article.classList.add("favorites-panel__card");
    article.dataset.city = current.name;

    button.setAttribute("aria-label", `View weather for ${current.name}`);
    button.classList.add("favorites-panel__btn");

    img.src = getIconUrl(current.weather[0].icon);
    img.alt = current.weather[0].description;
    img.classList.add("favorites-panel__icon");

    infoContainer.classList.add("favorites-panel__info");

    nameCity.classList.add("favorites-panel__city");
    nameCity.textContent = current.name;

    countryText.classList.add("favorites-panel__country");
    countryText.textContent = current.sys.country;

    infoContainer.append(nameCity, countryText);

    const roundedTemp = Math.round(current.main.temp);
    tempElement.classList.add("favorites-panel__temp");
    tempElement.innerHTML = `${roundedTemp}°C`;

    button.addEventListener("click", () => {
      if (typeof onCityClick === "function") {
        onCityClick(current.name);
      }
    });

    button.append(img, infoContainer, tempElement);
    article.append(button);
    li.append(article);
    ul.append(li);
  }
  favoritesPanel.append(ul);

  if (window.lucide) window.lucide.createIcons();
};
