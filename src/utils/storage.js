const STORAGE_KEY = "weather_favorites";

export const getFavorites = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

export const saveFavorites = (favorites) => localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));

export const isFavorite = (cityName) => {
  const favorites = getFavorites();
  return favorites.includes(cityName);
};

export const addFavorites = (cityName) => {
  const favorites = getFavorites();
  if (!favorites.includes(cityName)) {
    favorites.push(cityName);
    saveFavorites(favorites);
  }
  return favorites;
};

export const removeFavorite = (cityName) => {
  let favorites = getFavorites();
  favorites = favorites.filter((city) => city !== cityName);
  saveFavorites(favorites);
  return favorites;
};
