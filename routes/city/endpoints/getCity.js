import mongoose from "mongoose";
import { compileSchema, wrapAsyncController } from "../../../lib/utility.js";
import City from "../../../models/City.js";
import { getWeather } from "../../../lib/openweathermap.js";
import { getBusinesses } from "../../../lib/yelp.js";
import HTTPError from "../../../lib/errors/HTTPError.js";

const controller = wrapAsyncController(async ({ params: { id } }, res) => {
  const city = (await City.findOne({ _id: mongoose.mongo.ObjectId(id) }))?.toObject();
  if (!city) throw new HTTPError({
    code: "NotExists",
    status: 404,
    message: "The specified city does not exist"
  });
  city.weather = await getWeather(city.name);
  city.businesses = await getBusinesses({
    name: city.name,
    limit: 5,
    skip: 0
  });
  res.json(city);
});

const schema = {
  paramsValidator: compileSchema({
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" }
    },
    additionalProperties: false
  })
};

export default { controller, schema };