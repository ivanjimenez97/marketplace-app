import app from "./app.js";
import { PORT } from "./config.js";

app.get("/", (req, res) => {
  res.send("<h1>Hello NODEJS!</h1>");
});

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`);
});
