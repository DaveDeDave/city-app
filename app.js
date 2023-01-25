import express from "express";
import HTTPError from "./lib/errors/HTTPError.js";
import errorHandler from "./lib/middlewares/errorHandler.js";
import cityRouter from "./routes/city/router.js";
const app = express();

app.use("/v1/city", cityRouter);
app.all("*", (req, res) => {
  throw new HTTPError({
    code: "NotFound",
    status: 404,
    message: "Not found"
  })
});

app.use(errorHandler);

export default app;