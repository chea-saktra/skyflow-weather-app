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
  return `/assets/weather-icons/${localIconName}`;
};
