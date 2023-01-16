const {user} = require('../models');
const express = require("express");
const app = express();
const expressWinston = require("express-winston");

const logger = require("../src/logger");

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

const checkEmail = (req, res, next) => {
    user.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: "Failed! Email is already in use!!"
            });
            logger.error("Failed! Email is already in use!!");
            return;
        }
        next();
    });
};

module.exports = checkEmail;
