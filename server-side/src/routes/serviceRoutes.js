const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");

// controllers and validations
const {
  getAllServices,
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
router.post(
  "/",
  upload.array("images"),
  serviceCreationValidation,
  createService
);

// get all Services
router.get("/", getAllServices);

// get a Service using the Service id
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
