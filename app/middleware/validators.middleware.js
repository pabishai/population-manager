import { check } from "express-validator";

export const isNumberic = [
  check("location")
    .isNumeric()
    .withMessage("Location must be a number value"),
  check("male")
    .isNumeric()
    .withMessage("male population must be a number"),
  check("female")
    .isNumeric()
    .withMessage("female population must be numeric"),
  check("parentLocation")
    .optional()
    .isNumeric()
    .withMessage("parent area code must be a number")
];

export const isOptionalAndNumeric = [
  check("male")
    .optional()
    .isNumeric()
    .withMessage("male population must be a number"),
  check("female")
    .optional()
    .isNumeric()
    .withMessage("female population must be numeric")
];
