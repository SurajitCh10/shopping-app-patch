const {user} = require('../models');

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
            return;
        }
        next();
    });
};

module.exports = checkEmail;
