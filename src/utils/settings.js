const TEMPERATURE_KEY = "temp_unit";
const WINDSPEED_KEY = "windspeed_unit";

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
