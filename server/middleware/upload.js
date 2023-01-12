const util = require('util');
const multer = require('multer');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'Desktop');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploadFile = multer({
    storage
}).single('req.body.file');

const uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;