import express from "express";
import { upload } from "../utils/multer";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "../utils/validations/categoryValidation";

export const router = express.Router();
// get all categories
router.get("/", getAllCategories);

// get category by id
router.get("/:id", getCategoryById);

// create a new category
router.post(
  "/",
  upload.single("image"),
  createCategoryValidation,
  createCategory
);

// update category
router.patch(
  "/:id",
  upload.single("image"),
  updateCategoryValidation,
  updateCategory
);

// delete category
router.delete("/:id", deleteCategory);

