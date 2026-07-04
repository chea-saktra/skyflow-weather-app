const TEMPERATURE_KEY = "temp_unit";
const WINDSPEED_KEY = "windspeed_unit";
const DATE_FORMAT_KEY = "date_format";

export const getTemperatureUnit = () => localStorage.getItem(TEMPERATURE_KEY) || "C";

export const setTemperatureUnit = (unit) => localStorage.setItem(TEMPERATURE_KEY, unit);

export const converCelsiusToFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32);

export const formatTemperature = (celsiusValue) => {
  const unit = getTemperatureUnit();
  if (unit === "F" || unit === "f") {
    return `${converCelsiusToFahrenheit(celsiusValue)}°F`;
  }

  return `${Math.round(celsiusValue)}°C`;
};

export const getWindSpeedUnit = () => localStorage.getItem(WINDSPEED_KEY) || "kmh";

export const setWindSpeedUnit = (unit) => localStorage.setItem(WINDSPEED_KEY, unit.toLowerCase());

export const convertMetersPerSecondToMph = (ms) => Math.round(ms * 2.23694);

export const convertMetersPerSecondToKmh = (ms) => Math.round(ms * 3.6);

export const getDateFormat = () => localStorage.getItem(DATE_FORMAT_KEY) || "1";

export const setDateFormat = (format) => localStorage.setItem(DATE_FORMAT_KEY, format);

export const formatDate = (dateInput) => {
  const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const dateFormat = getDateFormat();

  if (dateFormat === "2") {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    })
      .format(dateObj)
      .replace(",", " .");
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  })
    .format(dateObj)
    .replace(" at ", " . ");
};
