import HTTPError from "../errors/HTTPError.js";
import { logError } from "../utility.js";

export default (err, req, res, next) => {
  if (err.name === "HTTPError") {
    res.status(err.status).json(err.toJSON());
  } else {
    logError(err);
    const unknownError = new HTTPError({
      code: "UnknownError",
      status: 500,
      message: "UnknownError"
    });
    res.status(unknownError.status).json(unknownError.toJSON());
  }
};