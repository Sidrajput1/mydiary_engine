import { body, param } from "express-validator";
export const createTagValidation = [
  body("name", "Name is required").notEmpty(),
  body("slug", "Slug is required").notEmpty(),
];

export const updateTagValidation = [
  param("id", "Invalid tag ID").isMongoId(),
  body("name").optional().notEmpty(),
  body("slug").optional().notEmpty(),
];
