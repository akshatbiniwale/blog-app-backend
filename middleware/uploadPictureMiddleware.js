const path = require("path");
const multer = require("multer");

// filename is used to set the unique filename in the format timeInSeconds-originalFileName

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadPicture = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1000000, // 1MB
    },
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname).toLowerCase();
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return cb(new Error("Only images are allowed"));
        }
        cb(null, true);
    },
});

module.exports = uploadPicture;
