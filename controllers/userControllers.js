const User = require("../models/User");

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // check if user already exists in the database
        let user = await User.findOne({ email });

        if (user) {
            // return res
            //     .status(400)
            //     .json({ message: "This user already exists!" });
            throw new Error("This user already exists!");
        }

        // creating a new user
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
        // return res.status(500).json({ message: "Something went wrong!" });
        next(error);
    }
};

module.exports = registerUser;
