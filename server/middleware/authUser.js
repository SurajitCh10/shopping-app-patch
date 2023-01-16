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

const authUser = async (req, res, next) => {
    

    try {
        // const token = req.header('Authorization').replace('Bearer ', '');
        const token = req.body.token;
        
        user.findOne({
            where: {
                token
            }
        }).then(user => {
            if(user) {
                next();
                return;
            }
            
            res.status(401).send({
                message: "Please authenticate !!"
            });
            logger.error("Please Authenticate");
        });


    } catch (e) {
        logger.error("Logout failed");
        res.status(400).send({ message: 'Logout failed !!' });
    }
 
};

module.exports = authUser;

