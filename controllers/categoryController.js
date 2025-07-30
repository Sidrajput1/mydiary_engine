import Category from "../models/category.js";

export const listCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort("name");
    res.json({ success: true, count: categories.length, categories });
  } catch (err) {
    next(err);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, category });
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
    };
    const category = await Category.create(data);
    res.status(201).json({ success: true, category });
  } catch (err) {
    if (err.code === 11000) {
      err = new Error("Category name or slug already exists");
      err.statusCode = 400;
    }
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const updates = (({ name, slug, description }) => ({
      name,
      slug,
      description,
    }))(req.body);
    const category = await Category.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, category });
  } catch (err) {
    if (err.code === 11000) {
      err = new Error("Category name or slug already exists");
      err.statusCode = 400;
    }
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    next(err);
  }
};
