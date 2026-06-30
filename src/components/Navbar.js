export const initNavbar = (onSearch) => {
  const searchForm = document.querySelector(".search-panel__form");
  const searchInput = document.getElementById("search-input");
  const locationTitle = document.querySelector(".mobile-header__location");
  const searchPanel = document.querySelector(".search-panel");
  const mobileHeader = document.querySelector(".mobile-header");
  const btnBack = document.querySelector(".search-panel__btn--back");
  const btnClear = document.querySelector(".search-panel__btn--clear");

  const toggleSearchMode = (isSearchActive) => {
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
};
