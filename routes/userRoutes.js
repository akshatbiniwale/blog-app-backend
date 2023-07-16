const express = require("express");
const router = express.Router();
const authGuard = require('../middleware/authMiddleware');
const { registerUser, loginUser ,userProfile } = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);

module.exports = router;
