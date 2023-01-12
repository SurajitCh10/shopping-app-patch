const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const router = require("./routes");
const db = require("../models");

const app = express();

const client = process.env.CLIENT_PORT;

app.use(helmet.frameguard({ action: "SAMEORIGIN" }));
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

const port = process.env.PORT;

db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log("Server is up on port " + port);
  });
});
