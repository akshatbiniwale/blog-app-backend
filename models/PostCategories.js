const mongoose = require("mongoose");

const PostCategoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const PostCategories = mongoose.model("PostCategories", PostCategoriesSchema);

module.exports = PostCategories;
