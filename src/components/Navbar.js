export const initNavbar = (onSearch) => {
  const searchForm = document.querySelector(".search-panel__form");
  const searchInput = document.getElementById("search-input");
  const locationTitle = document.querySelector(".mobile-header__location");
  const searchPanel = document.querySelector(".search-panel");
  const mobileHeader = document.querySelector(".mobile-header");
  const btnBack = document.querySelector(".search-panel__btn--back");
  const btnClear = document.querySelector(".search-panel__btn--clear");
  const btnUseLocation = document.querySelector(".search-panel__btn--location");

  const toggleSearchMode = (isSearchActive) => {
    if (window.innerWidth >= 600) {
      if (searchPanel) searchPanel.classList.remove("is-hidden");
      if (isSearchActive && searchInput) searchInput.focus();
      return;
    }

    if (!mobileHeader || !searchPanel) return;
    if (isSearchActive) {
      mobileHeader.classList.add("is-hidden");
      searchPanel.classList.remove("is-hidden");
      if (searchInput) searchInput.focus();
    } else {
      mobileHeader.classList.remove("is-hidden");
      searchPanel.classList.add("is-hidden");
      if (searchInput) searchInput.value = "";
    }
  };

  window.openSearchPanel = () => {
    toggleSearchMode(true);
  };

  if (locationTitle) locationTitle.addEventListener("click", () => toggleSearchMode(true));
  if (btnBack) btnBack.addEventListener("click", () => toggleSearchMode(false));

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const city = searchInput.value.trim();
      if (city) {
        onSearch(city);
        toggleSearchMode(false);
        searchInput.value = "";
        searchInput.blur();
      }
    });
  }

  if (btnClear && searchInput) {
    btnClear.addEventListener("click", (e) => {
      e.preventDefault();
      searchInput.value = "";
      searchInput.focus();
    });
  }

  if (btnUseLocation) {
    btnUseLocation.addEventListener("click", (e) => {
      e.preventDefault();

      if (navigator.geolocation) {
        btnUseLocation.disabled = true;
        const originalText = btnUseLocation.innerHTML;
        btnUseLocation.textContent = "Loading location...";

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            onSearch({ lat, lon });
            toggleSearchMode(false);

            btnUseLocation.disabled = false;
            btnUseLocation.innerHTML = originalText;
            if (window.lucide) window.lucide.createIcons();
          },
          (error) => {
            alert("Unable to retrieve your location! Please check that your GPS is turned on.");
            btnUseLocation.disabled = false;
            btnUseLocation.innerHTML = originalText;
            if (window.lucide) window.lucide.createIcons();
          },
        );
      } else {
        alert("Your browser does not support Geolocation.");
      }
    });
  }
};
