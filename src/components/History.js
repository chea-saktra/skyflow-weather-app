import { getIconUrl } from "../utils/helpers";
import { clearAllHistory, deleteHistoryItem, getHistory } from "../utils/history";
import { switchDOMVisibility } from "./Sidebar";

const bindHeaderEvents = (panel, onCityClick) => {
  const btnBack = panel.querySelector(".history-panel__btn--back");
  if (btnBack) {
    btnBack.addEventListener("click", () => {
      switchDOMVisibility("#home");
      document.querySelectorAll(".side-menu__link").forEach((link) => {
        if (link.getAttribute("href") === "#home") link.classList.add("is-active");
        else link.classList.remove("is-active");
      });
    });
  }

  const clearAllAciton = () => {
    if (confirm("Are you sure you want to clear all search history?")) {
      clearAllHistory();
      updateHistoryUI(onCityClick);
    }
  };

  const btnClearMobile = panel.querySelector(".history-panel__btn--clear-mobile");
  const btnClearDesktop = panel.querySelector(".history-panel__btn--clear-desktop");

  if (btnClearMobile) btnClearMobile.addEventListener("click", clearAllAciton);
  if (btnClearDesktop) btnClearDesktop.addEventListener("click", clearAllAciton);
};

const setupLiveFilter = (panel) => {
  const filterInput = panel.querySelector(".history-filter-input");
  if (!filterInput) return;

  filterInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    panel.querySelectorAll(".history-panel__item").forEach((item) => {
      const card = item.querySelector(".history-panel__card");
      const city = card.getAttribute("data-search-term");
      if (city.includes(term)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
};

const bindDeleteEvents = (panel, onCityClick) => {
  panel.querySelectorAll(".history-panel__btn--delete, .history-panel__btn--delete-mobile").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute("data-id"));
      deleteHistoryItem(id);
      updateHistoryUI(onCityClick);
    });
  });
};

export const updateHistoryUI = (onCityClick) => {
  const historyPanel = document.querySelector(".history-panel");

  historyPanel.innerHTML = "";
  const historyItems = getHistory();

  const mobileHeader = document.createElement("header");
  mobileHeader.classList.add("history-panel__mobile-header");

  const btnBack = document.createElement("button");
  btnBack.setAttribute("aria-label", "Go back to home");
  btnBack.classList.add("history-panel__btn--back");

  const backIcon = document.createElement("i");
  backIcon.setAttribute("data-lucide", "arrow-left");

  const titleMobile = document.createElement("h1");
  titleMobile.classList.add("history-panel__title-mobile");
  titleMobile.textContent = "Search History";

  const btnClear = document.createElement("button");
  btnClear.classList.add("history-panel__btn--clear-mobile");
  btnClear.textContent = "Clear";

  btnBack.append(backIcon);
  mobileHeader.append(btnBack, titleMobile, btnClear);
  historyPanel.append(mobileHeader);

  const desktopHeader = document.createElement("header");
  desktopHeader.classList.add("history-panel__desktop-header");

  const titleDesktop = document.createElement("h2");
  titleDesktop.classList.add("history-panel__title-desktop");
  titleDesktop.textContent = "Search History";

  const btnCleardesktop = document.createElement("button");
  btnCleardesktop.classList.add("history-panel__btn--clear-desktop");
  btnCleardesktop.textContent = "Clear History";

  desktopHeader.append(titleDesktop, btnCleardesktop);
  historyPanel.append(desktopHeader);

  const mobileSearchForm = document.createElement("form");
  mobileSearchForm.classList.add("history-panel__mobile-search");
  mobileSearchForm.setAttribute("role", "search");
  mobileSearchForm.addEventListener("submit", (e) => e.preventDefault());

  const searchWrapper = document.createElement("div");
  searchWrapper.classList.add("history-panel__search-wrapper");

  const searchIcon = document.createElement("i");
  searchIcon.setAttribute("data-lucide", "search");
  searchIcon.setAttribute("aria-hidden", "true");

  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.classList.add("history-filter-input")
  searchInput.placeholder = "Search history...";

  searchWrapper.append(searchIcon, searchInput);
  mobileSearchForm.append(searchWrapper);
  historyPanel.append(mobileSearchForm);

  if (historyItems.length === 0) {
    const noHistory = document.createElement("div");
    noHistory.classList.add("history-panel__empty");
    noHistory.setAttribute("role", "status");
    noHistory.textContent = "No search history found.";
    historyPanel.append(noHistory);
    bindHeaderEvents(historyPanel, onCityClick);
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  const tableContainer = document.createElement("div");
  tableContainer.classList.add("history-panel__table-container");

  const table = document.createElement("table");
  table.classList.add("history-panel__table");

  const thead = document.createElement("thead");
  const thr = document.createElement("tr");

  const headers = ["Date/Time", "City", "Condition", "Temp", "Action"];

  headers.forEach((text) => {
    const th = document.createElement("th");
    th.setAttribute("scope", "col");
    th.textContent = text;
    thr.append(th);
  });
  thead.append(thr);
  table.append(thead);

  const tbody = document.createElement("tbody");
  tbody.classList.add("history-panel__table-body");
  table.append(tbody);

  const mobileListContainer = document.createElement("ul");
  mobileListContainer.classList.add("history-panel__mobile-list");

  historyItems.forEach((item) => {
    const tr = document.createElement("tr");

    const tdDateTime = document.createElement("td");
    tdDateTime.textContent = item.dateTime;
    tr.append(tdDateTime);

    const tdCity = document.createElement("td");
    const btnCity = document.createElement("button");
    btnCity.type = "button";
    btnCity.classList.add("history-panel__clickable-city--btn");
    btnCity.textContent = item.city;
    btnCity.addEventListener("click", () => onCityClick(item.rawName));
    tdCity.append(btnCity);
    tr.append(tdCity);

    const tdCondition = document.createElement("td");
    tdCondition.textContent = item.condition;
    tr.append(tdCondition);

    const tdTemp = document.createElement("td");
    tdTemp.textContent = item.temp;
    tr.append(tdTemp);

    const tdAction = document.createElement("td");
    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.classList.add("history-panel__btn--delete");
    btnDelete.setAttribute("data-id", item.id);
    btnDelete.setAttribute("aria-label", `Delete ${item.city} from history`);

    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("data-lucide", "x");

    btnDelete.append(deleteIcon);
    tdAction.append(btnDelete);
    tr.append(tdAction);
    tbody.append(tr);

    const li = document.createElement("li");
    li.classList.add("history-panel__item");

    const card = document.createElement("article");
    card.classList.add("history-panel__card");
    card.setAttribute("data-search-term", item.city.toLowerCase());

    const btnCardContent = document.createElement("button");
    btnCardContent.type = "button";
    btnCardContent.classList.add("history-panel__card-content");
    btnCardContent.setAttribute("aria-label", `View weather for ${item.city}`);
    btnCardContent.addEventListener("click", () => onCityClick(item.rawName));

    const cardIcon = document.createElement("img");
    cardIcon.src = getIconUrl(item.icon);
    cardIcon.alt = item.condition;
    cardIcon.classList.add("history-panel__card-icon");

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("history-panel__card-info");

    const cardCityHeading = document.createElement("h3");
    cardCityHeading.classList.add("history-panel__card-city");
    cardCityHeading.textContent = item.city.split(",")[0];

    const cardDatePara = document.createElement("p");
    cardDatePara.classList.add("history-panel__card-date");

    const itemElem = document.createElement("time");
    itemElem.textContent = item.dateTime;

    cardDatePara.append(itemElem);
    cardInfo.append(cardCityHeading, cardDatePara);
    btnCardContent.append(cardIcon, cardInfo);

    const btnDeleteMobile = document.createElement("button");
    btnDeleteMobile.type = "button";
    btnDeleteMobile.classList.add("history-panel__btn--delete-mobile");
    btnDeleteMobile.setAttribute("data-id", item.id);
    btnDeleteMobile.setAttribute("aria-label", `Delete ${item.city} from history`);

    const deleteMobileIcon = document.createElement("i");
    deleteMobileIcon.setAttribute("data-lucide", "x");

    btnDeleteMobile.append(deleteMobileIcon);
    card.append(btnCardContent, btnDeleteMobile);
    li.append(card);
    mobileListContainer.append(li);
  });

  tableContainer.append(table);
  historyPanel.append(tableContainer, mobileListContainer);

  bindHeaderEvents(historyPanel, onCityClick);
  bindDeleteEvents(historyPanel, onCityClick);
  setupLiveFilter(historyPanel);

  if (window.lucide) window.lucide.createIcons();
};
