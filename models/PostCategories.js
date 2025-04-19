const mongoose = require("mongoose");

const PostCategoriesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const PostCategories = mongoose.model("PostCategories", PostCategoriesSchema);

module.exports = PostCategories;
