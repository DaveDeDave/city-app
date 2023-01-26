import { getEnvs } from "./utility.js"

const { 
  OPENWEATHERMAP_ENDPOINT,
  OPENWEATHERMAP_API_KEY
} = getEnvs([
  "OPENWEATHERMAP_ENDPOINT",
  "OPENWEATHERMAP_API_KEY"
]);

const getWeather = async (name) => {
  const response = await fetch(`${OPENWEATHERMAP_ENDPOINT}/weather?q=${name}&APPID=${OPENWEATHERMAP_API_KEY}`);
  return await response.json();
};

const cityExists = async (name) => {
  const weather = await getWeather(name);
  return weather.cod === 200;
};

export { getWeather, cityExists };