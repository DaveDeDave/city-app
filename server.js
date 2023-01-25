import app from "./app.js";
import { getEnvs } from "./lib/utility.js";

const { PORT, Environment } = getEnvs(["PORT", "Environment"]);

app.listen(PORT, () => {
  console.log(`${Environment} server started at localhost:${PORT}`)
});