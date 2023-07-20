const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        body: {
            type: Object,
            required: true,
        },
        photo: {
            type: String,
            require: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        tags: {
            type: [String],
        },
        categories: [
            { type: mongoose.Schema.Types.ObjectId, ref: "PostCategories" },
        ],
    },
    { timestamps: true }
);

PostSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "post",
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
