const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  createCategoryValidation,
  updateCategoryValidation,
} = require("../utils/validations/categoryValidation");

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

module.exports = router;
