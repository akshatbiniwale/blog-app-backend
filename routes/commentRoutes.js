const express = require("express");
const router = express.Router();
const { authGuard } = require("../middleware/authMiddleware");
const { createComment } = require("../controllers/commentControllers");

router.post("/", authGuard, createComment);

module.exports = router;
