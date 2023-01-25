import HTTPError from "../../../lib/errors/HTTPError.js";
import { compileSchema } from "../../../lib/utility.js";

const controller = ({ body: { name } }, res) => {
  // check if it exists
  // add it
  // return generated id
  throw new HTTPError({
    code: "ToBeImplemented",
    status: 501,
    message: "To be implemented"
  });
};

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