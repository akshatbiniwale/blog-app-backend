const express = require("express");
const router = express.Router();
const {
	createPostCategory,
	deletePostCategory,
	getAllPostCategories,
	updatePostCategory,
	getSingleCategory,
} = require("../controllers/postCategoriesController");
const { adminGuard, authGuard } = require("../middleware/authMiddleware");

router
	.route("/")
	.post(authGuard, adminGuard, createPostCategory)
	.get(getAllPostCategories);

router
	.route("/:postCategoryId")
	.get(getSingleCategory)
	.put(authGuard, adminGuard, updatePostCategory)
	.delete(authGuard, adminGuard, deletePostCategory);

module.exports = router;
