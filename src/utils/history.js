import { getTimeFormat } from "./settings";

const HISTORY_KEY = "weather_history";

export const getHistory = () =>
  JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

const formatHistoryDate = (date) => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const timeFormat = getTimeFormat();
  const is12Hour = timeFormat === "12";

  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: is12Hour,
  });

  if (date.toDateString() === now.toDateString()) {
    return `Today, ${timeString}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${timeString}`;
  } else {
    return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}, ${timeString}`;
  }
};

export const addHistoryItem = (weatherData) => {
  const history = getHistory();
  const newItem = {
    id: Date.now(),
    dateTime: formatHistoryDate(new Date()),
    city: `${weatherData.name}, ${weatherData.sys.country}`,
    condition: weatherData.weather[0].main,
    temp: `${Math.round(weatherData.main.temp)}°C`,
    icon: weatherData.weather[0].icon,
    rawName: weatherData.name,
  };

  const filtered = history.filter(
    (item) => item.rawName.toLowerCase() !== weatherData.name.toLowerCase(),
  );

  filtered.unshift(newItem);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered.slice(0, 20)));
};

export const deleteHistoryItem = (id) => {
  const history = getHistory();
  const filtered = history.filter((item) => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
};
export const clearAllHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};
