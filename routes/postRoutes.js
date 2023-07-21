const express = require("express");
const router = express.Router();
const { authGuard, adminGuard } = require("../middleware/authMiddleware");
const {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPosts,
} = require("../controllers/postControllers");

router.route("/").post(authGuard, adminGuard, createPost).get(getAllPosts);

router
    .route("/:slug")
    .put(authGuard, adminGuard, updatePost)
    .delete(authGuard, adminGuard, deletePost)
    .get(getPost);

module.exports = router;
