const express = require("express");
const router = express.Router();
const { authGuard } = require("../middleware/authMiddleware");
const {
    createComment,
    updateComment,
} = require("../controllers/commentControllers");

router.post("/", authGuard, createComment);
router.put("/:commentId", authGuard, updateComment);

module.exports = router;
