const fs = require("fs");
const { Types } = require("mongoose");

const Service = require("../models/Service");
const Category = require("../models/Category");

const AppError = require("../utils/AppError");
const imageKit = require("../utils/imageKit");
const User = require("../models/User");

const createService = async (req, res, next) => {
  if (!req.files) {
    return next(new AppError("Upload at least one image of the Service", 404));
  }

  // find if category sent exists
  const category = await Category.findOne({
    category_name: req.body.category_name,
  });
  if (!category) return next(new AppError("Category does not exist.", 404));

  // find if user sent exists
  const user = await User.findOne({
    _id: req.body.user_id,
  });
  if (!user) return next(new AppError("User does not exist.", 404));

  // handle images upload
  let imagesInfo = [];
  for (let i = 0; i < req.files.length; i++) {
    const image = req.files[i];
    const res = await imageKit.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "connect-services",
    });
    imagesInfo.push(res);
  }

  const createdService = await Service.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    keywords: [...req.body.keywords],
    time: req.body.time,
    extras: req.body.extras ? JSON.parse(req.body.extras) : undefined,
    images: imagesInfo,
    category_id: category._id,
    user_id: user._id
  });

  const toBeSentDocument = await Service.findById(createdService._id)
    .populate("category_id").populate("user_id")

  res.send({ message: "Service was created successfully!", toBeSentDocument });
};

const getAllServices = async (req, res, next) => {
  const Services = await Service.find()
    .populate("category_id");
  if (!Services) return next(new AppError("No Services found.", 404));
  res.send(Services);
};

const getService = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const service = await Service.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: { path: "user_id" },
    })
    .populate("category_id")

  if (!service) return next(new AppError("Service was not found.", 404));

  res.send(service);
};

const getServicebyCategoryId = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const services = await Service.find({ category_id: req.params.id })
    .populate({
      path: "reviews",
      populate: { path: "user_id" },
    })
    .populate("category_id")
    .populate("user_id")
  if (!services) return next(new AppError("no services was found.", 404));

  res.send(services);
};

const updateService = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const service = await Service.findById(req.params.id);
  if (!service) return next(new AppError("Service was not found.", 404));

  // handle category change
  let category_id = service.category_id;
  if (req.body.category_name) {
    const category = await Category.findOne({
      category_name: req.body.category_name,
    });

    if (!category) return next(new AppError("Category does not exist.", 404));

    category_id = category._id;
  }


  // handle images upload in case of uploading extra images
  let imagesInfo = [...service.images];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const image = req.files[i];
      const res = await imageKit.upload({
        file: image.buffer.toString("base64"),
        fileName: image.originalname,
        folder: "connect-services",
      });
      // THIS SHOULD BE RES.URL or NOO !
      imagesInfo.push(res);
    }
  }
console.log([service.keywords])
  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name ?? service.name,
      price: req.body.price ?? service.price,
      description: req.body.description ?? service.description,
      keywords: req.body.keywords ? req.body.keywords[0].split(",") : service.keywords,
      time: req.body.time ?? service.time,
      extras: req.body.extras
        ? JSON.parse(req.body.extras)
        : service.extras,
      images: imagesInfo,
      category_id: category_id
    },
    { new: true }
  );

  const toBeSentDocument = await Service.findById(updatedService._id)
    .populate("category_id")

  res.send({ message: "Service updated sucessfully!", toBeSentDocument });
};

const deleteService = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const service = await Service.findByIdAndDelete(req.params.id);
  console.log(service)
  if (!service) return next(new AppError("Service was not found.", 404));

  const imagesID = service.images.map((image) => image.fileId);

  // delete service's images from imageKit
  if (service.images.length) {
    const res = await imageKit.bulkDeleteFiles(imagesID);

    if (!res)
      return next(
        new AppError(
          "There was an error in deleting service images from ImageKit.",
          401
        )
      );
  }

  res.send({ message: "Service was deleted successfully!", service });
};

module.exports = {
  getAllServices,
  createService,
  getServicebyCategoryId,
  getService,
  updateService,
  deleteService,
};
