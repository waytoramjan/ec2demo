require("dotenv").config();

const dbConfig = require("./config/db.config");
const { Sequelize } = require("sequelize");
const express = require("express");
const User = require("./models/user.model");
// const nodeCron = require("node-cron");
const app = express();
const cors = require("cors");
// const { captured, sentRemainderToGuest } = require("./helpers/cron");
const port = process.env.PORT || 6000;
var corsOptions = { origin: "*" };

const models = require("./models/index");
app.use(cors(corsOptions));

app.use(express.json());

require("./routers/user.routes")(app);
require("./routers/license.routes")(app);

app.listen(port, () => {
  console.log(`server is listening to the port:${port}`);
});
