import app from "./app.js";

app.listen(process.env.PORT, () => {
  console.log(`Server started at localhost:${process.env.PORT}`)
});