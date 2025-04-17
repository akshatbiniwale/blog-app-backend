const multer = require("multer");
const User = require("../models/User");

const storage = multer.memoryStorage();
const uploadPicture = multer({ storage });

const registerUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		let user = await User.findOne({ email });
		if (user) {
			throw new Error("This user already exists.");
		}
		user = await User.create({
			name,
			email,
			password,
		});
		return res.status(201).json({
			_id: user._id,
			avatar: user.avatar,
			name: user.name,
			email: user.email,
			verified: user.verified,
			admin: user.admin,
			token: await user.generateJWT(),
		});
	} catch (error) {
		next(error);
	}
};

const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email });
		if (!user) {
			throw new Error("Email not found.");
		}
		if (await user.comparePassword(password)) {
			return res.status(201).json({
				_id: user._id,
				avatar: user.avatar,
				name: user.name,
				email: user.email,
				verified: user.verified,
				admin: user.admin,
				token: await user.generateJWT(),
			});
		} else {
			throw new Error("Invalid email or password.");
		}
	} catch (error) {
		next(error);
	}
};

const userProfile = async (req, res, next) => {
	try {
		let user = await User.findById(req.user._id);
		if (user) {
			return res.status(201).json({
				_id: user._id,
				avatar: user.avatar,
				name: user.name,
				email: user.email,
				verified: user.verified,
				admin: user.admin,
				token: await user.generateJWT(),
			});
		} else {
			let error = new Error("User not found.");
			error.statusCode = 404;
			next(error);
		}
	} catch (error) {
		next(error);
	}
};

const updateProfile = async (req, res, next) => {
	try {
		let user = await User.findById(req.user._id);
		if (!user) {
			throw new Error("User not found!");
		}
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password && req.body.password.length < 6) {
			throw new Error("Password length must be at least 6 characters.");
		} else if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUserProfile = await user.save();
		res.json({
			_id: updatedUserProfile._id,
			avatar: updatedUserProfile.avatar,
			name: updatedUserProfile.name,
			email: updatedUserProfile.email,
			verified: updatedUserProfile.verified,
			admin: updatedUserProfile.admin,
			token: await user.generateJWT(),
		});
	} catch (error) {
		next(error);
	}
};

const updateProfilePicture = async (req, res, next) => {
	try {
		const upload = uploadPicture.single("profilePicture");
		upload(req, res, async function (err) {
			if (err) {
				const error = new Error(
					"An error occurred while uploading. " + err.message
				);
				return next(error);
			}

			const user = await User.findById(req.user._id);
			if (!user) {
				throw new Error("User not found.");
			}

			if (req.file) {
				const base64Image = `data:${
					req.file.mimetype
				};base64,${req.file.buffer.toString("base64")}`;
				user.avatar = base64Image;
			} else {
				user.avatar = "";
			}

			await user.save();
			res.json({
				_id: user._id,
				avatar: user.avatar,
				name: user.name,
				email: user.email,
				verified: user.verified,
				admin: user.admin,
				token: await user.generateJWT(),
			});
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	registerUser,
	loginUser,
	userProfile,
	updateProfile,
	updateProfilePicture,
};
