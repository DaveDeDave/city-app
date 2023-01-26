import { getWeather } from "../../../lib/openweathermap.js";
import { compileSchema, wrapAsyncController } from "../../../lib/utility.js";
import City from "../../../models/City.js";

const controller = wrapAsyncController(async ({ query: { page, quantity } }, res) => {
  page = !page || isNaN(Number(page)) ? 1 : Number(page);
  quantity = !quantity || isNaN(Number(quantity)) ? 5 : Number(quantity);
  const cities = await City.find({}).skip(quantity*(page-1)).limit(quantity);
  const populatedCities = await Promise.all(cities.map(async city => {
    const populatedCity = city.toObject();
    populatedCity.weather = await getWeather(populatedCity.name);
    return populatedCity;
  }));
  res.json(populatedCities);
});

const schema = {
  queryValidator: compileSchema({
    type: "object",
    properties: {
      quantity: { type: "string" },
      page: { type: "string" }
    },
    additionalProperties: false
  })
};

export default { controller, schema };