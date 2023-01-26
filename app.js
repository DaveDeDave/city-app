import express from "express";
import HTTPError from "./lib/errors/HTTPError.js";
import errorHandler from "./lib/middlewares/errorHandler.js";
import { connectToMongo } from "./lib/utility.js";
import cityRouter from "./routes/city/router.js";
const app = express();

await connectToMongo();

app.use(express.json());
app.disable("x-powered-by");

app.use("/v1/city", cityRouter);
app.all("*", () => {
  throw new HTTPError({
    code: "NotFound",
    status: 404,
    message: "Not found"
  })
});

app.use(errorHandler);

export default app;