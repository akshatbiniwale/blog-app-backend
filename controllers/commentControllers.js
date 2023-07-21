const Comment = require("../models/Comment");
const Post = require("../models/Post");

const createComment = async (req, res, next) => {
    try {
        const { desc, slug, parent, replyOnUser } = req.body;

        const post = await Post.findOne({ slug: slug });

        if (!post) {
            const error = new Error("Post was not found");
            next(error);
            return;
        }

        const newComment = new Comment({
            user: req.user._id,
            desc,
            post: post._id,
            parent,
            replyOnUser,
        });

        const savedComment = await newComment.save();
        res.json(savedComment);
    } catch (error) {
        next(error);
    }
};

module.exports = { createComment };
