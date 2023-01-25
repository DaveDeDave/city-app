import { Router } from "express";
import HTTPError from "../../lib/errors/HTTPError.js";
const cityRouter = Router();

cityRouter.get("/", (req, res) => {
  throw new HTTPError({
    code: "ToBeImplemented",
    status: 501,
    message: "To be implemented"
  });
});

export default cityRouter;