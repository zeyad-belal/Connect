import { prisma } from "../db";
import AppError from "../utils/AppError";
import imageKit from "../utils/imageKit";

const getAllCategories = async (req: any, res: any, next: any) => {
  const categories = await prisma.category.findMany();
  res.send(categories);
};

const getCategoryById = async (req: any, res: any, next: any) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) return next(new AppError("Category not found", 404));

  res.send(category);
};

const createCategory = async (req: any, res: any, next: any) => {
  const { category_name } = req.body;

  // handle image upload
  if (req.file) {
    const image = req.file;
    const imageResponse = await imageKit.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "connect-categories",
    });

    const createdCategory = await prisma.category.create({
      data: {
        categoryName: category_name,
        image: imageResponse,
      },
    });

    return res.send({
      message: "Category created successfully!",
      createdCategory,
    });
  }

  const createdCategory = await prisma.category.create({
    data: { categoryName: category_name },
  });
  res.send({ message: "Category created successfully!", createdCategory });
};

const updateCategory = async (req: any, res: any, next: any) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) return next(new AppError("Category not found!", 404));

  let imageResponse: any = null;
  if (req.file) {
    if (
      category?.image &&
      typeof category.image === "object" &&
      "fileId" in category.image
    ) {
      imageKit.deleteFile(
        (category.image as { fileId: string }).fileId,
        function (error, result) {
          if (error) console.log(error);
          else console.log(result);
        }
      );
    }
    const image = req.file;
    imageResponse = await imageKit.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "connect-categories",
    });
  }

  const update: any = {};
  update.categoryName = req.body.category_name
    ? req.body.category_name
    : category.categoryName;
  update.image = imageResponse ? imageResponse : category.image;
  update.updated_at = Date.now();

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: update,
  });
  res.send({ message: "Category updated successfully!", updatedCategory });
};

const deleteCategory = async (req: any, res: any, next: any) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) return next(new AppError("Category not found!", 404));

  // delete category's image from imageKit
if (category.image && typeof category.image === 'object' && 'fileId' in category.image) {
  const imageResponse = await imageKit.deleteFile((category.image as { fileId: string }).fileId);

  if (!(imageResponse as any)) {
    return next(
      new AppError(
        "There was an error in deleting category image from ImageKit.",
        401
      )
    );
  }
}

  const deletedCategory = await prisma.category.delete({ where: { id } });
  res.send({ message: "Category deleted successfully!", deletedCategory });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
