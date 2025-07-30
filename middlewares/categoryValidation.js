import { body, param } from "express-validator";

export const createCategoryValidation = [
  body("name", "Name is required").notEmpty(),
  body("slug", "Slug is required").notEmpty(),
];

export const updateCategoryValidation = [
  param("id", "Invalid category ID").isMongoId(),
  body("name").optional().notEmpty(),
  body("slug").optional().notEmpty(),
];
