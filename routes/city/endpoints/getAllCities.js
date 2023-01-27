import { getWeather } from "../../../lib/openweathermap.js";
import { calculateSkip, compileSchema, wrapAsyncController } from "../../../lib/utility.js";
import { getBusinesses } from "../../../lib/yelp.js";
import City from "../../../models/City.js";

const controller = wrapAsyncController(async ({ query: { page, quantity } }, res) => {
  page = !page || isNaN(Number(page)) ? 1 : Number(page);
  const limit = !quantity || isNaN(Number(quantity)) ? 5 : Number(quantity);
  const skip = calculateSkip(limit, page);
  const cities = await City.find({}).skip(skip).limit(limit);
  const populatedCities = await Promise.all(cities.map(async city => {
    const populatedCity = city.toObject();
    populatedCity.weather = await getWeather(populatedCity.name);
    populatedCity.businesses = await getBusinesses({
      name: populatedCity.name,
      limit: 5,
      skip: 0
    });
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