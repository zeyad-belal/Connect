const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");

const {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

const {
  createBrandValidation,
  updateBrandValidation,
} = require("../utils/validations/brandValidation");

// get all brands
router.get("/", getAllBrands);

// get brand by id
router.get("/:id", getBrandById);

// create a new brand
router.post("/", upload.single("image"), createBrandValidation, createBrand);

// update brand
router.patch(
  "/:id",
  upload.single("image"),
  updateBrandValidation,
  updateBrand
);

// delete brand
router.delete("/:id", deleteBrand);

module.exports = router;
