import { getIconUrl } from "../utils/helpers";
import { converCelsiusToFahrenheit, getTemperatureUnit } from "../utils/settings";

export const updateForecastUI = (forecast, currentDt) => {
  const forecastList = document.querySelector(".forecast__list");
  if (!forecastList || !forecast.list) return;

  forecastList.innerHTML = ``;
  const todayDateStr = new Date(currentDt * 1000).toISOString().split("T")[0];

  const daysGroup = {};
  forecast.list.forEach((item) => {
    const dateKey = item.dt_txt.split(" ")[0];

    if (dateKey === todayDateStr) return;

    if (!daysGroup[dateKey]) {
      daysGroup[dateKey] = [];
    }
    daysGroup[dateKey].push(item);
  });

  const unit = getTemperatureUnit().toUpperCase();

  Object.keys(daysGroup)
    .slice(0, 5)
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
      const weekday = dateObj.toLocaleDateString("en-US", { weekday: "short" });
      const day = dateObj.toLocaleDateString("en-US", { day: "numeric" });
      const formattedDay = `${weekday} ${day}`;

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

      img.src = getIconUrl(representativeItem.weather[0].icon);
      img.alt = representativeItem.weather[0].main;
      img.classList.add("forecast__custom-icon");

      forecastTemps.classList.add("forecast__temps");

      maxTempSpan.classList.add("forecast__temp", "forecast__temp--max");
      minTempSpan.classList.add("forecast__temp", "forecast__temp--min");
      const finaMax = unit === "F" ? converCelsiusToFahrenheit(maxTemp) : Math.round(maxTemp);
      const finaMin = unit === "F" ? converCelsiusToFahrenheit(minTemp) : Math.round(minTemp);

      maxTempSpan.textContent = `${finaMax}°`;
      minTempSpan.textContent = `${finaMin}°`;

      forecastTemps.append(maxTempSpan, minTempSpan);
      li.append(time, img, forecastTemps);
      forecastList.append(li);
    });
};
