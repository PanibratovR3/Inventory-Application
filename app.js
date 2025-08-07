const express = require("express");
const path = require("path");
const developerRouter = require("./routes/developerRouter");
const publisherRouter = require("./routes/publisherRouter");
const platformRouter = require("./routes/platformRouter");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.use("/developers", developerRouter);
app.use("/publishers", publisherRouter);
app.use("/platforms", platformRouter);

app.listen(PORT, () =>
  console.log(`Server was laucnhed: http://localhost:${PORT}/`)
);
