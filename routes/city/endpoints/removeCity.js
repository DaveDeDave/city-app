import HTTPError from "../../../lib/errors/HTTPError.js";
import { compileSchema } from "../../../lib/utility.js";

const controller = (req, res) => {
  throw new HTTPError({
    code: "ToBeImplemented",
    status: 501,
    message: "To be implemented"
  });
};

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