const TEMPERATURE_KEY = "temp_unit";

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
