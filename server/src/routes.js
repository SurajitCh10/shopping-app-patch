const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

const path = require("path");
const fs = require("fs");
const formidable = require("formidable");

const { user } = require("../models");
const checkEmail = require("../middleware/verifySignup");
const authUser = require("../middleware/authUser");
const uploadFile = require("../middleware/upload");
const expressWinston = require("express-winston");
const { transports, format } = require("winston");

const pool = require("./database");

const router = new express.Router();
const logger = require("./logger");

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

router.post("/register", checkEmail, async (req, res) => {
  try {
    const token = uuidv4();

    user
      .create({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
        token,
      })
      .catch((e) => {
        if (e) console.log(e);
      });
    logger.info("New User Registered");
    res.status(201).send({ message: "Registered !!", token });
  } catch (e) {
    logger.error(`${e.message}` in register);
    res.status(404).send(e.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    // const User = await user.findOne({
    //     where: {
    //         email: req.body.email
    //     }
    // });

    const sqlQuery = "SELECT * FROM users WHERE email=?";
    const User = await pool.query(sqlQuery, req.body.email);

    if (User) {
      if (req.body.password === User[0].password) {
        const token = uuidv4();

        user.update(
          {
            token,
          },
          {
            where: {
              email: req.body.email,
            },
          }
        );

        const check_admin = 1 ? User[0].admin : 0;

        logger.info("Logged in");
        res.status(200).send({
          message: "Logged In !!",
          token,
          name: User[0].name,
          admin: check_admin,
        });
      } else {
        logger.error("Incorrect Password");
        res.status(400).send({ message: "Password Incorrect !!" });
      }
    } else {
      logger.error("User does not exist");
      res.status(404).send({ message: "User does not exist !!" });
    }
  } catch (e) {
    logger.error(`${e.message}` in login);
    res.status(400).send(e.message);
  }
});

router.post("/isadmin", async (req, res) => {
  try {
    const User = await user.findOne({
      where: {
        token: req.body.token,
      },
    });

    if (User) {
      if (req.body.token === User.token) {
        const check_admin = 1 ? User.admin : 0;

        res.status(200).send({
          admin: check_admin,
        });
      } else {
        res.status(400).send({ message: "Cookie does not exist!!" });
      }
    } else {
      res.status(404).send({ message: "Cookie does not exist!!" });
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/logout", authUser, async (req, res) => {
  try {
    user.update(
      {
        token: null,
      },
      {
        where: {
          // token: req.header('Authorization').replace('Bearer ', '')
          token: req.body.token,
        },
      }
    );
    logger.info("User Logged out");
    res.status(200).send({ message: "Logged Out !!" });
  } catch (e) {
    logger.error(e.message);
    res.status(400).send(e.message);
  }
});

router.post("/upload", async (req, res) => {
  try {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      var oldPath = files.file.filepath;
      var newPath =
        path.join(__dirname, "assets") + "/" + files.file.originalFilename;
      var rawData = fs.readFileSync(oldPath);

      fs.writeFile(newPath, rawData, (err) => {
        if (err) console.log(err);

        const sqlQuery = "INSERT INTO assets (name, path) VALUES (?, ?)";
        pool.query(sqlQuery, [files.file.originalFilename, newPath]);

        logger.info("File uploaded");
        return res.send("Successfully uploaded");
      });
    });
  } catch (e) {
    logger.error(e.message);
    res.status(400).send(e);
  }
});

router.get("/view", async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM assets";
    const result = await pool.query(sqlQuery);

    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
