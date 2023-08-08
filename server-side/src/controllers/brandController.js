const Brand = require("../models/Brand");
const Category = require("../models/Category");
const Product = require("../models/Product");

const AppError = require("../utils/AppError");
const imageKit = require("../utils/imageKit");

const getAllBrands = async (req, res, next) => {
  if (req.query.category_name) {
    const category = await Category.findOne({
      category_name: req.query.category_name
    });

    const brandIds = await Product.find({
      category_id: category._id
    }).distinct("brand_id");

    const brands = await Brand.find({ _id: { $in: brandIds } });
    res.send(brands);
  } else {
    const brands = await Brand.find();
    res.send(brands);
  }
};

const getBrandById = async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);
  if (!brand) return next(new AppError("Brand not found", 404));

  res.send(brand);
};

const createBrand = async (req, res, next) => {
  const { brand_name } = req.body;

  // handle image upload
  if (req.file) {
    const image = req.file;
    const imageResponse = await imageKit.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "brands"
    });

    const createdBrand = await Brand.create({
      brand_name,
      image: imageResponse
    });

    return res.send({
      message: "Brand created successfully!",
      createdBrand
    });
  }

  const createdBrand = await Brand.create({ brand_name });
  res.send({ message: "Brand created successfully!", createdBrand });
};

const updateBrand = async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);
  if (!brand) return next(new AppError("Brand not found!", 404));

  let imageResponse = null;
  if (req.file) {
    if (brand?.image && Object.keys(brand.image).length !== 0) {
      imageKit.deleteFile(brand.image.fileId, function (error, result) {
        if (error) console.log(error);
        else console.log(result);
      });
    }
    const image = req.file;
    imageResponse = await imageKit.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "brands"
    });
  }

  const update = {};
  update.brand_name = req.body.brand_name
    ? req.body.brand_name
    : brand.brand_name;
  update.image = imageResponse ? imageResponse : brand.image;
  update.updated_at = Date.now();

  const updatedBrand = await Brand.findByIdAndUpdate(id, update, {
    new: true
  });
  res.send({ message: "Brand updated successfully!", updatedBrand });
};

const deleteBrand = async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);
  if (!brand) return next(new AppError("Brand not found!", 404));

  // delete brand's image from imageKit
  if (brand.image) {
    const imageResponse = await imageKit.deleteFile(brand.image.fileId);

    if (!imageResponse)
      return next(
        new AppError(
          "There was an error in deleting brand image from ImageKit.",
          401
        )
      );
  }

  const deletedBrand = await Brand.findByIdAndDelete(id);
  res.send({ message: "Brand deleted successfully!", deletedBrand });
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
};
