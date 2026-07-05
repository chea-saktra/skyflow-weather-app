import {
  applyThemeUI,
  getDateFormat,
  getTemperatureUnit,
  getTheme,
  getTimeFormat,
  getWindSpeedUnit,
  setDateFormat,
  setTemperatureUnit,
  setTheme,
  setTimeFormat,
  setWindSpeedUnit,
} from "../utils/settings";
import { switchDOMVisibility } from "./Sidebar";

const createToggleRow = (text, inputId, isChecked = false) => {
  const row = document.createElement("div");
  row.classList.add("settings-panel__row");

  const labelText = document.createElement("label");
  labelText.setAttribute("for", inputId);
  labelText.textContent = text;

  const labelSwitch = document.createElement("label");
  labelSwitch.classList.add("switch");

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = inputId;
  input.checked = isChecked;

  const slider = document.createElement("span");
  slider.classList.add("slider");

  labelSwitch.append(input, slider);
  row.append(labelText, labelSwitch);
  return row;
};

export const updateSettingsUI = (onUnitChange) => {
  const settingsPanel = document.querySelector(".settings-panel");
  settingsPanel.textContent = "";

  //   Mobile Header
  const mobileHeader = document.createElement("header");
  mobileHeader.classList.add("settings-panel__mobile-header");

  const btnBack = document.createElement("button");
  btnBack.type = "button";
  btnBack.classList.add("settings-panel__btn--back");
  btnBack.setAttribute("aria-label", "Go back to home");

  const backIcon = document.createElement("i");
  backIcon.setAttribute("data-lucide", "arrow-left");
  btnBack.append(backIcon);

  const mobileTitle = document.createElement("h1");
  mobileTitle.id = "settings-title";
  mobileTitle.classList.add("settings-panel__title");
  mobileTitle.textContent = "Settings";

  const spacer = document.createElement("div");
  spacer.style.width = "2.5rem";

  mobileHeader.append(btnBack, mobileTitle, spacer);
  settingsPanel.append(mobileHeader);

  //   Desktop Header
  const desktopHeader = document.createElement("header");
  desktopHeader.classList.add("settings-panel__desktop-header");

  const desktopTitle = document.createElement("h2");
  desktopTitle.classList.add("settings-panel__title-desktop");
  desktopTitle.textContent = "Settings";

  desktopHeader.append(desktopTitle);
  settingsPanel.append(desktopHeader);

  //   Grid Content
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("settings-panel__grid");

  //   General Settings
  const generalCard = document.createElement("section");
  generalCard.classList.add("settings-panel__card");

  const generalTitle = document.createElement("h3");
  generalTitle.classList.add("settings-panel__card-title");

  const generalIcon = document.createElement("i");
  generalIcon.setAttribute("data-lucide", "settings");

  generalTitle.append(generalIcon, document.createTextNode(" General"));
  generalCard.append(generalTitle);

  const generalGroup = document.createElement("div");
  generalGroup.classList.add("settings-panel__group");

  //   Row: Temperature Unit
  const rowTemp = document.createElement("div");
  rowTemp.classList.add("settings-panel__row");

  const labelTemp = document.createElement("label");
  labelTemp.textContent = "Temperature Unit";

  const toggleBtnTemp = document.createElement("div");
  toggleBtnTemp.classList.add("settings-panel__toggle-btn");

  const currentUnit = getTemperatureUnit().toUpperCase();

  const btnC = document.createElement("button");
  btnC.type = "button";
  btnC.classList.add("btn-toggle");
  if (currentUnit === "C") btnC.classList.add("is-active");
  btnC.setAttribute("data-value", "C");
  btnC.textContent = "°C";

  const btnF = document.createElement("button");
  btnF.type = "button";
  btnF.classList.add("btn-toggle");
  if (currentUnit === "F") btnF.classList.add("is-active");
  btnF.setAttribute("data-value", "F");
  btnF.textContent = "°F";

  toggleBtnTemp.append(btnC, btnF);
  rowTemp.append(labelTemp, toggleBtnTemp);
  generalGroup.append(rowTemp);

  const rowWind = document.createElement("div");
  rowWind.classList.add("settings-panel__row");

  const labelWind = document.createElement("label");
  labelWind.textContent = "Wind Speed Unit";

  const toggleBtnWind = document.createElement("div");
  toggleBtnWind.classList.add("settings-panel__toggle-btn");

  const currentWindUnit = getWindSpeedUnit().toLowerCase();

  const btnKmh = document.createElement("button");
  btnKmh.type = "button";
  btnKmh.classList.add("btn-toggle");
  if (currentWindUnit === "kmh") btnKmh.classList.add("is-active");
  btnKmh.setAttribute("data-value", "kmh");
  btnKmh.textContent = "km/h";

  const btnMph = document.createElement("button");
  btnMph.type = "button";
  btnMph.classList.add("btn-toggle");
  if (currentWindUnit === "mph") btnMph.classList.add("is-active");
  btnMph.setAttribute("data-value", "mph");
  btnMph.textContent = "mph";

  toggleBtnWind.append(btnKmh, btnMph);
  rowWind.append(labelWind, toggleBtnWind);
  generalGroup.append(rowWind);

  //Row: Language
  const rowLang = document.createElement("div");
  rowLang.classList.add("settings-panel__row");

  const labelLang = document.createElement("label");
  labelLang.setAttribute("for", "settings-lang");
  labelLang.textContent = "Language";

  const selectLang = document.createElement("select");
  selectLang.id = "settings-lang";
  selectLang.classList.add("settings-panel__select");

  const optEn = document.createElement("option");
  optEn.value = "en";
  optEn.textContent = "English";

  const optKh = document.createElement("option");
  optKh.value = "kh";
  optKh.textContent = "ភាសាខ្មែរ";

  selectLang.append(optEn, optKh);
  rowLang.append(labelLang, selectLang);
  generalGroup.append(rowLang);

  //   Row: Date Format
  const rowDate = document.createElement("div");
  rowDate.classList.add("settings-panel__row", "settings-panel__row-desktop");

  const labelDate = document.createElement("label");
  labelDate.setAttribute("for", "setting-date");
  labelDate.textContent = "Date Format";

  const selectDate = document.createElement("select");
  selectDate.id = "setting-date";
  selectDate.classList.add("settings-panel__select");

  const optDate1 = document.createElement("option");
  optDate1.value = "1";
  optDate1.textContent = "May 28, 2026";

  const optDate2 = document.createElement("option");
  optDate2.value = "2";
  optDate2.textContent = "28/05/2026";

  selectDate.append(optDate1, optDate2);

  selectDate.value = getDateFormat();

  selectDate.addEventListener("change", (e) => {
    setDateFormat(e.target.value);
    if (typeof onUnitChange == "function") {
      onUnitChange();
    }
  });

  rowDate.append(labelDate, selectDate);
  generalGroup.append(rowDate);

  const rowTime = document.createElement("div");
  rowTime.classList.add("settings-panel__row", "settings-panel__row-desktop");

  const labelTime = document.createElement("label");
  labelTime.setAttribute("for", "setting-time");
  labelTime.textContent = "Time Format";

  const selectTime = document.createElement("select");
  selectTime.id = "setting-time";
  selectTime.classList.add("settings-panel__select");

  const optTime12 = document.createElement("option");
  optTime12.value = "12";
  optTime12.textContent = "12 Hour (AM/PM)";

  const optTime24 = document.createElement("option");
  optTime24.value = "24";
  optTime24.textContent = "24 Hour";

  selectTime.append(optTime12, optTime24);

  selectTime.value = getTimeFormat();

  selectTime.addEventListener("change", (e) => {
    setTimeFormat(e.target.value);
    if (typeof onUnitChange === "function") {
      onUnitChange();
    }
  });

  rowTime.append(labelTime, selectTime);
  generalGroup.append(rowTime);

  generalCard.append(generalGroup);
  gridContainer.append(generalCard);

  //   Preferences & About
  const rightColumn = document.createElement("div");
  rightColumn.classList.add("settings-panel__right-column");

  //   Section: Preferences
  const perfsCard = document.createElement("section");
  perfsCard.classList.add("settings-panel__card");

  const prefsTitle = document.createElement("h3");
  prefsTitle.classList.add("settings-panel__card-title");

  const prefsIcon = document.createElement("i");
  prefsIcon.setAttribute("data-lucide", "sliders");

  prefsTitle.append(prefsIcon, document.createTextNode(" Preferences"));
  perfsCard.append(prefsTitle);

  const prefsGroup = document.createElement("div");
  prefsGroup.classList.add("settings-panel__group");

  const isDark = getTheme() === "dark";

  prefsGroup.append(
    createToggleRow("Dark Mode", "toggle-dark-mode", isDark),
    createToggleRow("Use Location", "toggle-use-location", true),
    createToggleRow("Notifications", "toggle-notifications", false),
  );
  perfsCard.append(prefsGroup);
  rightColumn.append(perfsCard);

  //   Section: About App
  const aboutCard = document.createElement("section");
  aboutCard.classList.add("settings-panel__card", "settings-panel__card-about");

  const aboutTitle = document.createElement("h3");
  aboutTitle.classList.add("settings-panel__card-title");

  const aboutIcon = document.createElement("i");
  aboutIcon.setAttribute("data-lucide", "info");

  aboutTitle.append(aboutIcon, document.createTextNode(" About App"));
  aboutCard.append(aboutTitle);

  const aboutGroup = document.createElement("div");
  aboutGroup.classList.add("settings-panel__group");

  const rowVersion = document.createElement("div");
  rowVersion.classList.add("settings-panel__row");

  const spanVersionText = document.createElement("span");
  spanVersionText.textContent = "App Version";

  const spanVersionValue = document.createElement("span");
  spanVersionValue.classList.add("settings-panel__value");
  spanVersionValue.textContent = "1.0.0";

  rowVersion.append(spanVersionText, spanVersionValue);
  aboutGroup.append(rowVersion);

  //   Check for Updates Button Row
  const btnUpdate = document.createElement("button");
  btnUpdate.type = "button";
  btnUpdate.classList.add("settings-panel__row", "settings-panel__row--btn");

  const spanUpdateText = document.createElement("span");
  spanUpdateText.textContent = "Check for Updates";

  const updateChevron = document.createElement("i");
  updateChevron.setAttribute("data-lucide", "chevron-right");

  btnUpdate.append(spanUpdateText, updateChevron);
  aboutGroup.append(btnUpdate);

  aboutCard.append(aboutGroup);
  rightColumn.append(aboutCard);

  gridContainer.append(rightColumn);
  settingsPanel.append(gridContainer);

  if (btnBack) {
    btnBack.addEventListener("click", () => {
      switchDOMVisibility("#home");
      document.querySelectorAll(".side-menu__link").forEach((link) => {
        if (link.getAttribute("href") === "#home")
          link.classList.add("is-active");
        else link.classList.remove("is-active");
      });
    });
  }

  const tempButtons = toggleBtnTemp.querySelectorAll(".btn-toggle");
  tempButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tempButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const selectedUnit = btn.getAttribute("data-value");
      setTemperatureUnit(selectedUnit);

      if (typeof onUnitChange === "function") {
        onUnitChange();
      }
    });
  });

  const windButtons = toggleBtnWind.querySelectorAll(".btn-toggle");
  windButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      windButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const selectedWindUnit = btn.getAttribute("data-value");
      setWindSpeedUnit(selectedWindUnit);

      if (typeof onUnitChange === "function") {
        onUnitChange();
      }
    });
  });

  const darkModeToggle = settingsPanel.querySelector("#toggle-dark-mode");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
      applyThemeUI();
    });
  }

  settingsPanel
    .querySelectorAll(".settings-panel__toggle-btn")
    .forEach((group) => {
      if (group === toggleBtnTemp || group === toggleBtnWind) return;
      const buttons = group.querySelectorAll(".btn-toggle");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          buttons.forEach((b) => b.classList.remove("is-active"));
          btn.classList.add("is-active");
        });
      });
    });

  if (window.lucide) window.lucide.createIcons();
};
