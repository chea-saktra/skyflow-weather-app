export const weatherIconMap = {
  "01d": "Sunny.webp",
  "01n": "Night.webp",

  "02d": "Partly_Cloudy.webp",
  "02n": "Night.webp",
  "03d": "Partly_Cloudy.webp",
  "03n": "Night.webp",
  "04d": "Partly_Cloudy.webp",
  "04n": "Night.webp",

  "09d": "Rainy.webp",
  "09n": "Rainy.webp",
  "10d": "Rainy_with_Sun.webp",
  "10n": "Rainy.webp",

  "11d": "Thunderstorm.webp",
  "11n": "Lightning.webp",

  "13d": "Sonwfall.webp",
  "13n": "Snow.webp",
  "13s": "Sleet.webp",

  "50d": "Light_Drizzle.webp",
  "50n": "Light_Drizzle.webp",
};

export const getIconUrl = (iconCode) => {
  const localIconName = weatherIconMap[iconCode] || "Sunny.webp";
  return `/assets/weather-icons/${localIconName}`;
};
