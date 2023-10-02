const fileController = require('../controllers/file.controller');

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../server/public/images");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = app => {
    app.post("/api/upload/:id", upload.array('images',5),fileController.uploadFile);
    app.delete("/api/upload/:idD/:idF", fileController.deleteFile);
}