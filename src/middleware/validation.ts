import { body } from "express-validator";

export const validateUser = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("name").notEmpty().withMessage("Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role").notEmpty().withMessage("Role is required"),
];
