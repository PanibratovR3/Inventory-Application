const express = require("express");
const path = require("path");
const developerRouter = require("./routes/developerRouter");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.use("/developers", developerRouter);

app.listen(PORT, () =>
  console.log(`Server was laucnhed: http://localhost:${PORT}/`)
);
