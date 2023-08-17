const Category = require("../models/Category");

const AppError = require("../utils/AppError");
const imageKit = require("../utils/imageKit");

const getAllCategories = async (req, res, next) => {
  const categories = await Category.find();
  res.send(categories);
};

const getCategoryById = async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) return next(new AppError("Category not found", 404));

  res.send(category);
};

const createCategory = async (req, res, next) => {
  const { category_name } = req.body;

  // handle image upload
  if (req.file) {
    const image = req.file;
    const imageResponse = await imageKit.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "categories"
    });

    const createdCategory = await Category.create({
      category_name,
      image: imageResponse
    });

    return res.send({
      message: "Category created successfully!",
      createdCategory
    });
  }

  const createdCategory = await Category.create({ category_name });
  res.send({ message: "Category created successfully!", createdCategory });
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) return next(new AppError("Category not found!", 404));

  let imageResponse = null;
  if (req.file) {
    if (category?.image && Object.keys(category.image).length !== 0) {
      imageKit.deleteFile(category.image.fileId, function (error, result) {
        if (error) console.log(error);
        else console.log(result);
      });
    }
    const image = req.file;
    imageResponse = await imageKit.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "categories"
    });
  }

  const update = {};
  update.category_name = req.body.category_name
    ? req.body.category_name
    : category.category_name;
  update.image = imageResponse ? imageResponse : category.image;
  update.updated_at = Date.now();

  const updatedCategory = await Category.findByIdAndUpdate(id, update, {
    new: true
  });
  res.send({ message: "Category updated successfully!", updatedCategory });
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) return next(new AppError("Category not found!", 404));

  // delete category's image from imageKit
  if (category.image) {
    const imageResponse = await imageKit.deleteFile(category.image.fileId);

    if (!imageResponse)
      return next(
        new AppError(
          "There was an error in deleting category image from ImageKit.",
          401
        )
      );
  }

  const deletedCategory = await Category.findByIdAndDelete(id);
  res.send({ message: "Category deleted successfully!", deletedCategory });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
