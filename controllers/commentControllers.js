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

const updateComment = async (req, res, next) => {
    try {
        const { desc } = req.body;

        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            const error = new Error("Comment was not found");
            next(error);
            return;
        }

        comment.desc = desc || comment.desc;

        const updatedComment = await comment.save();
        res.json(updatedComment);
        res.json();
    } catch (error) {
        next(error);
    }
};

module.exports = { createComment, updateComment };
