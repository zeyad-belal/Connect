const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");

// controllers and validations
const {
  getAllServices,
  getServicebyCategoryId,
  getServicebySellerId,
  getFourServicesbyCategoryId,
  createService,
  getService,
  updateService,
  deleteService
} = require("../controllers/serviceController");

const {
  serviceCreationValidation,
  serviceUpdateValidation
} = require("../utils/validations/serviceValidation");

// create a Service
router.post( "/", upload.array("images"), serviceCreationValidation, createService );

// get all Services
router.get("/", getAllServices);

// get  Services by gategory id
router.get("/filtered/:id", getServicebyCategoryId);

// get  Services by seller id
router.get("/seller/:id", getServicebySellerId);

// get 4 services only
router.get("/filteredFour/:id", getFourServicesbyCategoryId);


// get a Service by Service id
router.get("/:id", getService);


// update a Service using the Service id
router.put(
  "/:id",
  upload.array("images"),
  serviceUpdateValidation,
  updateService
);

// delete a Service
router.delete("/:id", deleteService);

module.exports = router;
