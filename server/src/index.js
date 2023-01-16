const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const router = require("./routes");
const db = require("../models");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const app = express();

const client = process.env.CLIENT_PORT;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../logs/access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet.frameguard({ action: "DENY" }));
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

// app.use(function (req, res, next) {
//     res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
//     next();
// });

const port = process.env.PORT;

db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log("Server is up on port " + port);
  });
});
