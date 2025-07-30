import Post from "../models/post.js";
import Comment from "../models/comment.js";
import User from "../models/user.js";
import Tag from "../models/tag.js";
import Category from "../models/category.js";


export const listAllPostByAdmin = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('author', 'name email').sort('-createdAt');
        if (!posts) {
            const err = new Error("Posts not found");
            err.statusCode = 404;
            return next(err);
        }
        res.json({ success: true, count: posts.length, posts });
    } catch (error) {
        next(error);
    }
};

export const deletePostByAdmin = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            const err = new Error("Post not found");
            err.statusCode = 404;
            return next(err);
        }
        res.json({ success: true, message: "Post deleted" });
    } catch (error) {
        next(error);
    }
};

export const listAllCommentsByAdmin = async (req, res, next) => {
    try {
        const comments = await Comment.find().sort('-createdAt');
        if (!comments) {
            const err = new Error("Comments not found");
            err.statusCode = 404;
            return next(err);
        }
        res.json({ success: true, count: comments.length, comments });
    } catch (error) {
        next(error);
    }
};

export const approveCommentByAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
        if (!comment) {
            const err = new Error("Comment not found");
            err.statusCode = 404;
            return next(err);
        }
        res.json({ success: true, message: "Comment approved", comment });
    } catch (error) {
        next(error);
    }
};

export const deleteCommentByAdmin = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment)
            return res.status(404).json({
                success: false,
                error: 'Comment not found'
            });
        res.json({ success: true, message: 'Comment deleted' });
    } catch (err) {
        next(err);
    }
};

export const listAllCategoriesByAdmin = async (req, res, next) => {
    try {
        const categories = await Category.find().sort('name');
        if (!categories) {
            const err = new Error("Categories not found");
            err.statusCode = 404;
            return next(err);
        }
        res.json({ success: true, count: categories.length, categories });
    } catch (error) {
        next(error);
    }
};

export const deleteCategoryByAdmin = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category)
            return res.status(404).json({
                success: false,
                error: 'Category not found'
            });
        res.json({ success: true, message: 'Category deleted' });
    } catch (err) {
        next(err);
    }
};

export const listAllTagsByAdmin = async (req, res, next) => {
    try {
        const tags = await Tag.find().sort('name');
        if (!tags) {
            const err = new Error("Tags not found");
            err.statusCode = 404;
            return next(err);
        }
        res.json({ success: true, count: tags.length, tags });
    } catch (error) {
        next(error);
    }
};

export const deleteTagByAdmin = async (req, res, next) => {
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id);
        if (!tag)
            return res.status(404).json({
                success: false,
                error: 'Tag not found'
            });
        res.json({ success: true, message: 'Tag deleted' });
    } catch (err) {
        next(err);
    }
};

export const listAllUsersByAdmin = async (req, res, next) => {
    try {
        const users = await User.find().select('-passwordHash');
        if (!users) {
            const err = new Error("Users not found");
            err.statusCode = 404;
            return next(err);
        }
        res.json({ success: true, count: users.length, users });
    } catch (error) {
        next(error);
    }
};

export const deleteUserByAdmin = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        res.json({ success: true, message: 'User deleted' });
    } catch (err) {
        next(err);
    }
}


