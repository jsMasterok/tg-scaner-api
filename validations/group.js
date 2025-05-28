import { body } from "express-validator";

export const groupCreateValidation = [
  body("tg_id")
    .isString()
    .withMessage("tg_id must be a string")
    .notEmpty()
    .withMessage("tg_id is required"),

  body("link").isURL().withMessage("link must be a valid URL"),

  body("peer_type")
    .isIn(["group", "channel", "supergroup"])
    .withMessage("peer_type must be group, channel or supergroup"),

  body("title")
    .isString()
    .withMessage("title must be a string")
    .notEmpty()
    .withMessage("title is required"),

  body("about").isString().withMessage("about must be a string"),

  body("category").isString().withMessage("category must be a string"),

  body("country").isString().withMessage("country must be a string"),

  body("language").isString().withMessage("language must be a string"),

  body("image100").isURL().withMessage("image100 must be a valid URL"),

  body("image640").isURL().withMessage("image640 must be a valid URL"),

  body("participants_count")
    .isInt({ min: 0 })
    .withMessage("participants_count must be a positive integer"),

  // Optional fields:
  body("username")
    .optional()
    .isString()
    .withMessage("username must be a string"),

  body("active_usernames")
    .optional()
    .isArray()
    .withMessage("active_usernames must be an array of strings"),

  body("rkn_verification")
    .optional()
    .isArray()
    .withMessage("rkn_verification must be an array"),

  body("tgstat_restriction")
    .optional()
    .isArray()
    .withMessage("tgstat_restriction must be an array"),

  body("reviews").optional().isArray().withMessage("reviews must be an array"),

  body("reviews.*.user")
    .optional()
    .isString()
    .withMessage("reviews.user must be a string"),

  body("reviews.*.review")
    .optional()
    .isString()
    .withMessage("reviews.review must be a string"),

  body("reviews.*.date")
    .optional()
    .isISO8601()
    .withMessage("reviews.date must be a valid date"),

  body("reviews.*.photos")
    .optional()
    .isArray()
    .withMessage("reviews.photos must be an array"),
];
