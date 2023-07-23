const express = require("express");
const router = express.Router();
const { authGuard } = require("../middleware/authMiddleware");
const {
    createComment,
    updateComment,
    deleteComment,
} = require("../controllers/commentControllers");

router.post("/", authGuard, createComment);
router
    .route("/:commentId")
    .put(authGuard, updateComment)
    .delete(authGuard, deleteComment);

module.exports = router;
