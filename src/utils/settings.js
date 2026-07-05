const TEMPERATURE_KEY = "temp_unit";
const WINDSPEED_KEY = "windspeed_unit";
const DATE_FORMAT_KEY = "date_format";
const TIME_FORMAT_KEY = "time_format";
const THEME_KEY = "theme";
const NOTIFICATIONS_KEY = "notifications";

export const getTemperatureUnit = () =>
  localStorage.getItem(TEMPERATURE_KEY) || "C";

export const setTemperatureUnit = (unit) =>
  localStorage.setItem(TEMPERATURE_KEY, unit);

export const convertCelsiusToFahrenheit = (celsius) =>
  Math.round((celsius * 9) / 5 + 32);

export const formatTemperature = (celsiusValue) => {
  const unit = getTemperatureUnit();
  if (unit === "F" || unit === "f") {
    return `${convertCelsiusToFahrenheit(celsiusValue)}°F`;
  }

  return `${Math.round(celsiusValue)}°C`;
};

export const getWindSpeedUnit = () =>
  localStorage.getItem(WINDSPEED_KEY) || "kmh";

export const setWindSpeedUnit = (unit) =>
  localStorage.setItem(WINDSPEED_KEY, unit.toLowerCase());

export const convertMetersPerSecondToMph = (ms) => Math.round(ms * 2.23694);

export const convertMetersPerSecondToKmh = (ms) => Math.round(ms * 3.6);

export const getDateFormat = () => localStorage.getItem(DATE_FORMAT_KEY) || "1";

export const setDateFormat = (format) =>
  localStorage.setItem(DATE_FORMAT_KEY, format);

export const getTimeFormat = () =>
  localStorage.getItem(TIME_FORMAT_KEY) || "12";

export const setTimeFormat = (format) =>
  localStorage.setItem(TIME_FORMAT_KEY, format);

export const formatDate = (dateInput, timezoneOffset = 0) => {
  const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const localTimestamp = dateObj.getTime() + timezoneOffset * 1000;
  const targetDate = new Date(localTimestamp);

  const dateFormat = getDateFormat();
  const timeFormat = getTimeFormat();
  const is12Hour = timeFormat === "12";

  if (dateFormat === "2") {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: is12Hour,
      timeZone: "UTC",
    })
      .format(targetDate)
      .replace(",", " .");
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: is12Hour,
    timeZone: "UTC",
  })
    .format(targetDate)
    .replace(" at ", " . ");
};

export const getTheme = () => localStorage.getItem(THEME_KEY) || "light";

export const setTheme = (theme) => localStorage.setItem(THEME_KEY, theme);

export const applyThemeUI = () => {
  const currentTheme = getTheme();
  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark-theme");
    document.body.classList.add("dark-theme");
  } else {
    document.documentElement.classList.remove("dark-theme");
    document.body.classList.remove("dark-theme");
  }
};

export const getNotificationsStatus = () =>
  localStorage.getItem(NOTIFICATIONS_KEY) === "true";

export const setNotificationsStatus = async (status, callback) => {
  if (status && "Notification" in window) {
    if (Notification.permission === "denied") {
      alert(
        "You have denied notifications on this browser. Please click on the lock icon (🔒) above the URL and change it to Allow to enable this feature! 🙏",
      );
      if (typeof callback === "function") callback(false);
      return;
    }
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      localStorage.setItem(NOTIFICATIONS_KEY, "true");
      if (typeof callback === "function") callback(true);
    } else {
      localStorage.setItem(NOTIFICATIONS_KEY, "false");
      if (typeof callback === "function") callback(false);
    }
  } else {
    localStorage.setItem(NOTIFICATIONS_KEY, "false");
    if (typeof callback === "function") callback(false);
  }
};

export const sendWeatherNotification = (title, body, iconUrl = "") => {
  if (!getNotificationsStatus() || !("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(title, {
      body: body,
      icon: iconUrl || "default-icon.png",
    });
  }
};
