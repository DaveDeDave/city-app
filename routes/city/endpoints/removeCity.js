import { compileSchema, wrapAsyncController } from "../../../lib/utility.js";
import mongoose from "mongoose";
import City from "../../../models/City.js";
import HTTPError from "../../../lib/errors/HTTPError.js";

const controller = wrapAsyncController(async ({ params: { id } }, res) => {
  const result = await City.deleteOne({ _id: mongoose.mongo.ObjectId(id) });
  if (result.deletedCount === 0) {
    throw new HTTPError({
      code: "NotExists",
      status: 404,
      message: "The specified city does not exist"
    });
  }
  res.status(204).end();
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