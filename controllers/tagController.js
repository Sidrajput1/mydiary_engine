import Tag from "../models/tag.js";

export const listTag = async (req, res, next) => {
  try {
    const tags = await Tag.find().sort("name");
    res.json({ success: true, count: tags.length, tags });
  } catch (err) {
    next(err);
  }
};

export const createTag = async (req, res, next) => {
  try {
    const data = { name: req.body.name, slug: req.body.slug };
    const tag = await Tag.create(data);
    res.status(201).json({ success: true, tag });
  } catch (err) {
    if (err.code === 11000) {
      err = new Error("Tag name or slug already exists");
      err.statusCode = 400;
    }
    next(err);
  }
};

export const getTag = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      const err = new Error("Tag not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, tag });
  } catch (err) {
    next(err);
  }
};

export const updateTag = async (req, res, next) => {
  try {
    const updates = (({ name, slug }) => ({ name, slug }))(req.body);
    const tag = await Tag.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!tag) {
      const err = new Error("Tag not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, tag });
  } catch (err) {
    if (err.code === 11000) {
      err = new Error("Tag name or slug already exists");
      err.statusCode = 400;
    }
    next(err);
  }
};

export const deleteTag = async (req,res,next) => {
    try {
const tag = await Tag.findByIdAndDelete(req.params.id);
if (!tag) {
const err = new Error('Tag not found'); err.statusCode = 404; return next(err);
}
res.json({ success: true, message: 'Tag deleted' });
} catch (err) {
next(err);
}
}
