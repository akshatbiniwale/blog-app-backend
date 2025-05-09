const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");

// the bearer token and the type of the token is passed in the header requests

const authGuard = async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const { id } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(id).select("-password");
            /*
                the above code validates the token of the user and then changes the request to user which deselects the password field.
            */
            next();
        } catch (error) {
            let err = new Error("Not authorized, Token failed!");
            err.statusCode = 401;
            next(err);
        }
    } else {
        let error = new Error("Not authorized, No token");
        error.statusCode = 401;
        next(error);
    }
};

// next function is used to point to the next middleware in the stack until all the middleware's are cleared.

const adminGuard = (req, res, next) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        let error = new Error("Not authorized as an admin");
        error.statusCode = 401;
        next(error);
    }
};

module.exports = { authGuard, adminGuard };
