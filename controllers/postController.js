import Post from "../models/post.js";
import slugify from "../utils/slugify.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import paginate from "../utils/paginate.js";
import mongoose from "mongoose";

// get post with filters

export const getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, author, search } = req.query;
    let query = Post.find();
    if (author) query = query.where("author").equals(author);
    if (status) query = query.where("status").equals(status);
    if (search) query = query.find({ $text: { $search: search } });
    const posts = await paginate(query.sort("-createdAt"), { page, limit });
    res.json({ success: true, count: posts.length, posts });
  } catch (error) {
    next(error);
  }
};

// get single post by id or slug
export const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = mongoose.Types.ObjectId.isValid(id)
      ? await Post.findById(id).populate("author", "name email")
      : await Post.findOne({ slug: id }).populate("author", "name email");
    if (!post) {
      const err = new Error("Post not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

// create post

export const createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, status, categories, tags } = req.body;
    let slug = slugify(title);
    const exist = await Post.findOne({ slug });
    if (exist) {
      // ensure unique slug
      const uniqueSuffix = Date.now();
      slug = `${slug}-${uniqueSuffix}`;
    }

    let featuredImageUrl = null;
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "blog-posts",
        resource_type: "auto",
      });

      featuredImageUrl = result.secure_url;

      await fs.unlink(req.file.path);
    }

    const post = await Post.create({
      title,
      slug,
      content,
      excerpt,
      categories: categories?.split(",") || [],
      tags: tags?.split(",") || [],
      status: status || "draft",
      featuredImage: featuredImageUrl,
      author: req.user._id,
    });
    res.status(201).json({ success: true, post });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => { });
    }
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.title) {
      updates.slug = slugify(updates.title);
    }

    const post = await Post.findByIdAndUpdate(id, updates, { new: true });
    if (!post) {
      const err = new Error("Post not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      const err = new Error("Post not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};

export const publishPost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { status: 'published' },
      { new: true, runValidators: true });

    if (!post) {
      const err = new Error("Post not found");
      err.statusCode = 404;
      return next(err);
    }

    res.json({ success: true, post });
  } catch (error) {
    next(error);
  }
};
