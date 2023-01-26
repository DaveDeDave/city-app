import HTTPError from "../../../lib/errors/HTTPError.js";
import { cityExists } from "../../../lib/openweathermap.js";
import { compileSchema, wrapAsyncController } from "../../../lib/utility.js";
import City from "../../../models/City.js";

const controller = wrapAsyncController(async ({ body: { name } }, res) => {
  if (!(await cityExists(name))) {
    throw new HTTPError({
      code: "NotExists",
      status: 400,
      message: "The specified city does not exist"
    });
  }
  const city = new City({ name });
  const { _id } = await city.save();
  res.json({ _id });
});

const schema = {
  bodyValidator: compileSchema({
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" }
    },
    additionalProperties: false
  })
};

export default { controller, schema };