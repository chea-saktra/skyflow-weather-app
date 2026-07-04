export const weatherIconMap = {
  "01d": "Sunny.png",
  "01n": "Night.png",

  "02d": "Partly_Cloudy.png",
  "02n": "Night.png",
  "03d": "Partly_Cloudy.png",
  "03n": "Night.png",
  "04d": "Partly_Cloudy.png",
  "04n": "Night.png",

  "09d": "Rainy.png",
  "09n": "Rainy.png",
  "10d": "Rainy_with_Sun.png",
  "10n": "Rainy.png",

  "11d": "Thunderstorm.png",
  "11n": "Lightning.png",

  "13d": "Sonwfall.png",
  "13n": "Snow.png",
  "13s": "Sleet.png",

  "50d": "Light_Drizzle.png",
  "50n": "Light_Drizzle.png",
};

export const getIconUrl = (iconCode) => {
  const localIconName = weatherIconMap[iconCode] || "Sunny.png";
  return `../../src/assets/weather-icons/${localIconName}`;
};

export const createToggleRow = (text, inputId, isChecked = false) => {
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
