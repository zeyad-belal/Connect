const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");

// controllers and validations
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const {
  productCreationValidation,
  productUpdateValidation
} = require("../utils/validations/productValidation");

// create a product
router.post(
  "/",
  upload.array("images"),
  productCreationValidation,
  createProduct
);

// get all products
router.get("/", getAllProducts);

// get a product using the product id
router.get("/:id", getProduct);

// update a product using the product id
router.put(
  "/:id",
  upload.array("images"),
  productUpdateValidation,
  updateProduct
);

// delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
