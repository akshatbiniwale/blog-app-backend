const express = require("express");
const router = express.Router();
const { authGuard, adminGuard } = require("../middleware/authMiddleware");
const {
    createPost,
    updatePost,
    deletePost,
    getPost,
} = require("../controllers/postControllers");

router.post("/", authGuard, adminGuard, createPost);
router
    .route("/:slug")
    .put(authGuard, adminGuard, updatePost)
    .delete(authGuard, adminGuard, deletePost)
    .get(getPost);

module.exports = router;
