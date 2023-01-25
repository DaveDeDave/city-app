import app from "./app.js";
import { getEnvs } from "./lib/utility.js";

const { PORT, ENVIRONMENT } = getEnvs(["PORT", "ENVIRONMENT"]);

app.listen(PORT, () => {
  console.log(`${ENVIRONMENT} server started at localhost:${PORT}`)
});