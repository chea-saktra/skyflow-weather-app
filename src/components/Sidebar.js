export const initSidebar = (onNavigate) => {
  const sideMenu = document.querySelector(".side-menu");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuLinks = document.querySelectorAll(".side-menu__link");
  const menuToggleBtn = document.getElementById("menu-toggle");

  const toggleSideMenu = () => {
    if (sideMenu && menuOverlay) {
      sideMenu.classList.toggle("is-active");
      menuOverlay.classList.toggle("is-active");
    }
  };

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
      onNavigate(targetHref);

      sideMenu.classList.remove("is-active");
      menuOverlay.classList.remove("is-active");
    });
  });
};

export const switchDOMVisibility = (targetHref) => {
  const mobileHeader = document.querySelector(".mobile-header");
  const currentWeather = document.querySelector(".current-weather");
  const weatherDetails = document.querySelector(".weather-details");
  const forecastSection = document.querySelector(".forecast");
  const favoritesPanel = document.querySelector(".favorites-panel");

  if (currentWeather) currentWeather.classList.add("is-hidden");
  if (weatherDetails) weatherDetails.classList.add("is-hidden");
  if (forecastSection) forecastSection.classList.add("is-hidden");
  if (favoritesPanel) favoritesPanel.classList.add("is-hidden");

  if (targetHref === "#home") {
    if (mobileHeader) mobileHeader.classList.remove("is-hidden");
    currentWeather.classList.remove("is-hidden");
    weatherDetails.classList.remove("is-hidden");
    forecastSection.classList.remove("is-hidden");
  } else if (targetHref === "#favorites") {
    if (mobileHeader) mobileHeader.classList.add("is-hidden");
    favoritesPanel.classList.remove("is-hidden");
  }
};
