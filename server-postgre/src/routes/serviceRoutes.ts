import express from "express";

import {upload} from "../utils/multer";

// controllers and validations
import {
  getAllServices,
  getServicebyCategoryId,
  getServicebySellerId,
  getFourServicesbyCategoryId,
  createService,
  getService,
  updateService,
  deleteService
} from "../controllers/serviceController";

import {
  serviceCreationValidation,
  serviceUpdateValidation
} from "../utils/validations/serviceValidation";

export const router = express.Router();

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
