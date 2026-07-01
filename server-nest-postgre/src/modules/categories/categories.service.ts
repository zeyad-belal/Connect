import { Injectable, NotFoundException } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ImageKitService, UploadedImage } from '../uploads/imagekit.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageKit: ImageKitService,
  ) {}

  findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(dto: CreateCategoryDto, file?: Express.Multer.File) {
    const image = file
      ? await this.imageKit.upload(file, 'connect-categories')
      : undefined;

    const createdCategory = await this.prisma.category.create({
      data: {
        categoryName: dto.categoryName,
        image: image as unknown as Prisma.InputJsonValue,
      },
    });
    return { message: 'Category created successfully!', createdCategory };
  }

  async update(id: number, dto: UpdateCategoryDto, file?: Express.Multer.File) {
    const category = await this.findOne(id);

    let image = category.image;
    if (file) {
      const oldFileId = this.extractFileId(category);
      if (oldFileId) await this.imageKit.delete([oldFileId]);
      image = (await this.imageKit.upload(
        file,
        'connect-categories',
      )) as unknown as Prisma.JsonValue;
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: {
        categoryName: dto.categoryName ?? category.categoryName,
        image: image as Prisma.InputJsonValue,
      },
    });
    return { message: 'Category updated successfully!', updatedCategory };
  }

  async remove(id: number) {
    const category = await this.findOne(id);

    const fileId = this.extractFileId(category);
    if (fileId) await this.imageKit.delete([fileId]);

    const deletedCategory = await this.prisma.category.delete({
      where: { id },
    });
    return { message: 'Category deleted successfully!', deletedCategory };
  }

  // The image column is free-form JSON; pull the ImageKit fileId out safely.
  private extractFileId(category: Category): string | null {
    const image = category.image as Partial<UploadedImage> | null;
    return image && typeof image === 'object' && 'fileId' in image
      ? (image.fileId ?? null)
      : null;
  }
}
