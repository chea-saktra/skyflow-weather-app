const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_VASE_URL;

export const fetchWeatherData = async (query) => {
  try {
    let queryString = "";
    if (typeof query === "object" && query.lat && query.lon) {
      queryString = `lat=${query.lat}&lon=${query.lon}`;
    } else {
      queryString = `q=${encodeURIComponent(query)}`;
    }

    const currentResponse = await fetch(
      `${BASE_URL}weather?${queryString}&appid=${API_KEY}&units=metric`,
    );

    if (!currentResponse.ok) {
      throw new Error("The city you are looking for cannot be found!");
    }

    const currentData = await currentResponse.json();

    const forecastResponse = await fetch(
      `${BASE_URL}forecast?${queryString}&appid=${API_KEY}&units=metric`,
    );

    const forecastData = await forecastResponse.json();

    return {
      current: currentData,
      forecast: forecastData,
    };
  } catch (error) {
    alert(error.message);
    return null;
  }
};
