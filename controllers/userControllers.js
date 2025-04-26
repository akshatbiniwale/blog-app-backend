const multer = require("multer");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

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
		const userIdToUpdate = req.params.userId;

		let userId = req.user._id;

		if (!req.user.admin && userId !== userIdToUpdate) {
			let error = new Error("Forbidden resource");
			error.statusCode = 403;
			throw error;
		}

		let user = await User.findById(userIdToUpdate);
		if (!user) {
			throw new Error("User not found!");
		}

		if (typeof req.body.admin !== "undefined" && req.user.admin) {
			user.admin = req.body.admin;
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

const getAllUsers = async (req, res, next) => {
	try {
		const filter = req.query.searchKeyword;
		let where = {};
		if (filter) {
			where.email = { $regex: filter, $options: "i" };
		}
		let query = User.find(where);
		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * pageSize;
		const total = await User.find(where).countDocuments();
		const pages = Math.ceil(total / pageSize);

		res.header({
			"x-filter": filter,
			"x-totalcount": JSON.stringify(total),
			"x-currentpage": JSON.stringify(page),
			"x-pagesize": JSON.stringify(pageSize),
			"x-totalpagecount": JSON.stringify(pages),
		});

		if (page > pages) {
			return res.json([]);
		}

		const result = await query
			.skip(skip)
			.limit(pageSize)
			.sort({ updatedAt: "desc" });

		return res.json(result);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		let user = await User.findById(req.params.userId);

		if (!user) {
			throw new Error("User no found");
		}

		const postsToDelete = await Post.find({ user: user._id });
		const postIdsToDelete = postsToDelete.map((post) => post._id);

		await Comment.deleteMany({
			post: { $in: postIdsToDelete },
		});

		await Post.deleteMany({
			_id: { $in: postIdsToDelete },
		});

		postsToDelete.forEach((post) => {
			fileRemover(post.photo);
		});

		await user.remove();

		res.status(204).json({ message: "User is deleted successfully" });
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
	getAllUsers,
	deleteUser,
};
