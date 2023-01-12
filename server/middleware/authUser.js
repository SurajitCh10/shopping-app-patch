const {user} = require('../models');

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
        });


    } catch (e) {
        res.status(400).send({ message: 'Logout failed !!' });
    }
 
};

module.exports = authUser;

