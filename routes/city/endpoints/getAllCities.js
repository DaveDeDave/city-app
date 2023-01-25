import HTTPError from "../../../lib/errors/HTTPError.js";

const controller = (req, res) => {
  throw new HTTPError({
    code: "ToBeImplemented",
    status: 501,
    message: "To be implemented"
  });
};

export default { controller };