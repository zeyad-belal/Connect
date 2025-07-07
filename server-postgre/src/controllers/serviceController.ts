import { prisma } from "../db";
import AppError from "../utils/AppError";
import imageKit from "../utils/imageKit";

const createService = async (req: any, res: any, next: any) => {
  try {
    if (!req.files) {
      return next(new AppError("Upload at least one image of the Service", 404));
    }

    // Find if category sent exists
    const category = await prisma.category.findUnique({
      where: { categoryName: req.body.category_name }
    });
    if (!category) return next(new AppError("Category does not exist.", 404));

    // Find if user sent exists
    const userId = parseInt(req.body.user_id);
    if (isNaN(userId)) {
      return next(new AppError("Invalid user ID.", 400));
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    if (!user) return next(new AppError("User does not exist.", 404));

    // Handle images upload
    let imagesInfo: any[] = [];
    for (let i = 0; i < req.files.length; i++) {
      const image = req.files[i];
      const res = await imageKit.upload({
        file: image.buffer.toString("base64"),
        fileName: image.originalname,
        folder: "connect-services",
      });
      imagesInfo.push(res);
    }

    const createdService = await prisma.service.create({
      data: {
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description,
        keywords: req.body.keywords.split(","),
        time: req.body.time,
        extras: req.body.extras ? JSON.parse(req.body.extras) : undefined,
        images: imagesInfo,
        categoryId: category.id,
        userId: user.id,
      },
      include: {
        category: true,
        user: true
      }
    });

    res.send({ message: "Service was created successfully!", createdService });
  } catch (error) {
    return next(new AppError("Failed to create service.", 500));
  }
};

const getAllServices = async (req: any, res: any, next: any) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        category: true,
        user: true,
        reviews: {
          include: {
            user: true
          }
        }
      }
    });
    
    if (!services || services.length === 0) {
      return next(new AppError("No Services found.", 404));
    }
    
    res.send(services);
  } catch (error) {
    return next(new AppError("Failed to fetch services.", 500));
  }
};

const getService = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const serviceId = parseInt(req.params.id);
    
    if (isNaN(serviceId)) {
      return next(new AppError("Invalid Service ID.", 400));
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        reviews: {
          include: {
            user: true
          }
        },
        category: true,
        user: true
      }
    });

    if (!service) return next(new AppError("Service was not found.", 404));

    res.send(service);
  } catch (error) {
    return next(new AppError("Failed to fetch service.", 500));
  }
};

const getServicebyCategoryId = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const categoryId = parseInt(req.params.id);
    
    if (isNaN(categoryId)) {
      return next(new AppError("Invalid Category ID.", 400));
    }

    const services = await prisma.service.findMany({
      where: { categoryId: categoryId },
      include: {
        reviews: {
          include: {
            user: true
          }
        },
        category: true,
        user: true
      }
    });
    
    if (!services || services.length === 0) {
      return next(new AppError("No services were found.", 404));
    }

    res.send(services);
  } catch (error) {
    return next(new AppError("Failed to fetch services.", 500));
  }
};

const getServicebySellerId = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const sellerId = parseInt(req.params.id);
    
    if (isNaN(sellerId)) {
      return next(new AppError("Invalid Seller ID.", 400));
    }

    const services = await prisma.service.findMany({
      where: { userId: sellerId },
      include: {
        reviews: {
          include: {
            user: true
          }
        },
        category: true,
        user: true
      }
    });
    
    if (!services || services.length === 0) {
      return next(new AppError("No services were found.", 404));
    }

    res.send(services);
  } catch (error) {
    return next(new AppError("Failed to fetch services.", 500));
  }
};

const getFourServicesbyCategoryId = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const categoryId = parseInt(req.params.id);
    
    if (isNaN(categoryId)) {
      return next(new AppError("Invalid Category ID.", 400));
    }

    const services = await prisma.service.findMany({
      where: { categoryId: categoryId },
      orderBy: { createdAt: 'desc' }, // Sort by createdAt in descending order (latest first)
      take: 4, // Limit the result to 4 services
      include: {
        reviews: {
          include: {
            user: true
          }
        },
        category: true,
        user: true
      }
    });

    if (!services || services.length === 0) {
      return next(new AppError("No services were found.", 404));
    }

    res.send(services);
  } catch (error) {
    return next(new AppError("Failed to fetch services.", 500));
  }
};

const updateService = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const serviceId = parseInt(req.params.id);
    
    if (isNaN(serviceId)) {
      return next(new AppError("Invalid Service ID.", 400));
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });
    if (!service) return next(new AppError("Service was not found.", 404));

    // Handle category change
    let categoryId = service.categoryId;
    if (req.body.category_name) {
      const category = await prisma.category.findUnique({
        where: { categoryName: req.body.category_name }
      });

      if (!category) return next(new AppError("Category does not exist.", 404));

      categoryId = category.id;
    }

    // Handle images upload in case of uploading extra images
    let imagesInfo: any[] = service.images ? [...(service.images as any[])] : [];
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        const image = req.files[i];
        const res = await imageKit.upload({
          file: image.buffer.toString("base64"),
          fileName: image.originalname,
          folder: "connect-services",
        });
        imagesInfo.push(res);
      }
    }

    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        name: req.body.name ?? service.name,
        price: req.body.price ? parseFloat(req.body.price) : service.price,
        description: req.body.description ?? service.description,
        keywords: req.body.keywords
          ? req.body.keywords[0].split(",")
          : service.keywords,
        time: req.body.time ?? service.time,
        extras: req.body.extras ? JSON.parse(req.body.extras) : service.extras,
        images: imagesInfo,
        categoryId: categoryId,
      },
      include: {
        category: true,
        user: true
      }
    });

    res.send({ message: "Service updated successfully!", updatedService });
  } catch (error) {
    return next(new AppError("Failed to update service.", 500));
  }
};

const deleteService = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const serviceId = parseInt(req.params.id);
    
    if (isNaN(serviceId)) {
      return next(new AppError("Invalid Service ID.", 400));
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });
    
    if (!service) return next(new AppError("Service was not found.", 404));

    // Delete the service
    const deletedService = await prisma.service.delete({
      where: { id: serviceId },
      include: {
        category: true,
        user: true
      }
    });

    console.log(deletedService);

    const imagesID = (deletedService.images as any[]).map((image) => image.fileId);

    // Delete service's images from imageKit
    if ((deletedService.images as any[]).length) {
      const res = await imageKit.bulkDeleteFiles(imagesID);

      if (!res)
        return next(
          new AppError(
            "There was an error in deleting service images from ImageKit.",
            401
          )
        );
    }

    res.send({ message: "Service was deleted successfully!", deletedService });
  } catch (error) {
    return next(new AppError("Failed to delete service.", 500));
  }
};

export {
  getAllServices,
  createService,
  getServicebyCategoryId,
  getServicebySellerId,
  getFourServicesbyCategoryId,
  getService,
  updateService,
  deleteService,
};
