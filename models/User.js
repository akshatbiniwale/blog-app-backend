const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
    {
        avatar: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        verificationCode: {
            type: String,
            required: false,
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 10);
        return next();
    }

    return next();
});

UserSchema.methods.generateJWT = async function () {
    return await jsonwebtoken.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    // make it 1hr later
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
