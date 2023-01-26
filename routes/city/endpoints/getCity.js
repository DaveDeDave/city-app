import mongoose from "mongoose";
import { compileSchema, wrapAsyncController } from "../../../lib/utility.js";
import City from "../../../models/City.js";
import { getWeather } from "../../../lib/openweathermap.js";

const controller = wrapAsyncController(async ({ params: { id } }, res) => {
  const city = (await City.findOne({ _id: mongoose.mongo.ObjectId(id) })).toObject();
  city.weather = await getWeather(city.name);
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