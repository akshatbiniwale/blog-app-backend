const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const uploadPicture = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1000000, // 5MB
	},
	fileFilter: function (req, file, cb) {
		const ext = path.extname(file.originalname).toLowerCase();
		if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
			return cb(new Error("Only images are allowed"));
		}
		cb(null, true);
	},
});

module.exports = uploadPicture;
