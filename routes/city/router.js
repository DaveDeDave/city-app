import { Router } from "express";
import validateRequest from "../../lib/middlewares/validateRequest.js";
import addCity from "./endpoints/addCity.js";
import getAllCities from "./endpoints/getAllCities.js";
import getCity from "./endpoints/getCity.js";
import removeCity from "./endpoints/removeCity.js";
const cityRouter = Router();

cityRouter.post("/", validateRequest(addCity.schema), addCity.controller);
cityRouter.get("/", getAllCities.controller);
cityRouter.get("/:id", validateRequest(getCity.schema), getCity.controller);
cityRouter.delete("/:id", validateRequest(removeCity.schema), removeCity.controller);

export default cityRouter;