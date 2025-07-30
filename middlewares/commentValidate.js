import { body, param } from "express-validator";

export const createCommentValidation = [
  param("postId", "Invalid post ID").isMongoId(),
  body("authorName", "Name is required").notEmpty(),
  body("authorEmail", "Valid email is required").isEmail(),
  body("content", "Content is required").notEmpty(),
];

export const updateCommentValidation = [
  param("id", "Invalid comment ID").isMongoId(),
  body("content").optional().notEmpty(),
  body("status").optional().isIn(["pending", "approved"]),
];
