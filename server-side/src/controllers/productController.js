const fs = require("fs");
const { Types } = require("mongoose");

const Product = require("../models/Product");
const Category = require("../models/Category");
const Brand = require("../models/Brand");

const AppError = require("../utils/AppError");
const imageKit = require("../utils/imageKit");

const createProduct = async (req, res, next) => {
  if (!req.files) {
    return next(new AppError("Upload at least one image of the product", 404));
  }

  // find if category sent exists
  const category = await Category.findOne({
    category_name: req.body.category_name,
  });
  if (!category) return next(new AppError("Category does not exist.", 404));

  // find if brand sent exists
  const brand = await Brand.findOne({
    brand_name: req.body.brand_name,
  });
  if (!brand) return next(new AppError("Brand does not exist.", 404));

  // handle images upload
  let imagesInfo = [];
  for (let i = 0; i < req.files.length; i++) {
    const image = req.files[i];
    const res = await imageKit.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "products",
    });
    imagesInfo.push(res);
  }

  const createdProduct = await Product.create({
    name: req.body.name,
    price: req.body.price,
    brand_id: brand._id,
    details: req.body.details ? JSON.parse(req.body.details) : undefined,
    images: imagesInfo,
    category_id: category._id,
    stock_count: req.body.stock_count,
    new_price: req.body.new_price ? req.body.new_price : 0,
  });

  const toBeSentDocument = await Product.findById(createdProduct._id)
    .populate("category_id")
    .populate("brand_id");

  res.send({ message: "Product was created successfully!", toBeSentDocument });
};

const getAllProducts = async (req, res, next) => {
  const products = await Product.find()
    .populate("brand_id")
    .populate("category_id");
  // if (!products) return next(new AppError("No products found.", 404));
  // As an empty array should be expected to return, so the error is not needed
  res.send(products);
};

const getProduct = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const product = await Product.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: { path: "user_id" },
    })
    .populate("category_id")
    .populate("brand_id");

  if (!product) return next(new AppError("Product was not found.", 404));

  res.send(product);
};

const updateProduct = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError("Product was not found.", 404));

  // handle category change
  let category_id = product.category_id;
  if (req.body.category_name) {
    const category = await Category.findOne({
      category_name: req.body.category_name,
    });

    if (!category) return next(new AppError("Category does not exist.", 404));

    category_id = category._id;
  }

  // handle brand change
  let brand_id = product.brand_id;
  if (req.body.brand_name) {
    const brand = await Brand.findOne({
      brand_name: req.body.brand_name,
    });

    if (!brand) return next(new AppError("Brand does not exist.", 404));

    brand_id = brand._id;
  }

  // handle images upload in case of uploading extra images
  let imagesInfo = [...product.images];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const image = req.files[i];
      const res = await imageKit.upload({
        file: image.buffer.toString("base64"),
        fileName: image.originalname,
        folder: "products",
      });
      imagesInfo.push(res);
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name ?? product.name,
      price: req.body.price ?? product.price,
      brand: req.body.brand ?? product.brand,
      details: req.body.details
        ? JSON.parse(req.body.details)
        : product.details,
      images: imagesInfo,
      category_id: category_id,
      brand_id: brand_id,
      stock_count: req.body.stock_count ?? product.stock_count,
      new_price: req.body.new_price ?? product.new_price,
    },
    { new: true }
  );

  const toBeSentDocument = await Product.findById(updatedProduct._id)
    .populate("category_id")
    .populate("brand_id");

  res.send({ message: "Product updated sucessfully!", toBeSentDocument });
};

const deleteProduct = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const product = await Product.findByIdAndDelete(req.params.id);
  console.log(product)
  if (!product) return next(new AppError("Product was not found.", 404));

  const imagesID = product.images.map((image) => image.fileId);

  // delete product's images from imageKit
  if (product.images.length) {
    const res = await imageKit.bulkDeleteFiles(imagesID);

    if (!res)
      return next(
        new AppError(
          "There was an error in deleting product images from ImageKit.",
          401
        )
      );
  }

  res.send({ message: "Product was deleted successfully!", product });
};

module.exports = {
  getAllProducts,
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
