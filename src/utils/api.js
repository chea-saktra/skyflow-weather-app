const API_KEY = "1b5ba74e89caa4d7c2a8b7379579ce31";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

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
