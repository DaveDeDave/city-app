import mongoose from "mongoose";
import { calculateSkip, compileSchema, wrapAsyncController } from "../../../lib/utility.js";
import City from "../../../models/City.js";
import { getBusinesses } from "../../../lib/yelp.js";
import HTTPError from "../../../lib/errors/HTTPError.js";

const controller = wrapAsyncController(async ({ params: { id }, query: { page, quantity } }, res) => {
  page = !page || isNaN(Number(page)) ? 1 : Number(page);
  const limit = !quantity || isNaN(Number(quantity)) ? 5 : Number(quantity);
  const skip = calculateSkip(limit, page);
  const city = (await City.findOne({ _id: mongoose.mongo.ObjectId(id) })).toObject();
  if (!city) throw new HTTPError({
    code: "NotExists",
    status: 404,
    message: "The specified city does not exist"
  });
  city.businesses = await getBusinesses({
    name: city.name,
    limit,
    skip
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
  }),
  queryValidator: compileSchema({
    type: "object",
    properties: {
      quantity: { type: "string" },
      page: { type: "string" }
    },
    additionalProperties: false
  }),
};

export default { controller, schema };