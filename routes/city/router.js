import { Router } from "express";
import validateRequest from "../../lib/middlewares/validateRequest.js";
import addCity from "./endpoints/addCity.js";
import getAllCities from "./endpoints/getAllCities.js";
import getCity from "./endpoints/getCity.js";
import getCityBusinesses from "./endpoints/getCityBusinesses.js";
import getCityWeather from "./endpoints/getCityWeather.js";
import removeCity from "./endpoints/removeCity.js";
const cityRouter = Router();

cityRouter.post("/", validateRequest(addCity.schema), addCity.controller);
cityRouter.get("/", validateRequest(getAllCities.schema), getAllCities.controller);
cityRouter.get("/:id", validateRequest(getCity.schema), getCity.controller);
cityRouter.get("/:id/weather", validateRequest(getCityWeather.schema), getCityWeather.controller);
cityRouter.get("/:id/businesses", validateRequest(getCityBusinesses.schema), getCityBusinesses.controller);
cityRouter.delete("/:id", validateRequest(removeCity.schema), removeCity.controller);

export default cityRouter;