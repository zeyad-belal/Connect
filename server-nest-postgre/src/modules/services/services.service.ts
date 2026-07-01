import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

type Requester = Pick<User, 'id' | 'role'>;
import { PrismaService } from '../../prisma/prisma.service';
import { ImageKitService, UploadedImage } from '../uploads/imagekit.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

// Reused on every read so service responses always carry their relations.
const serviceInclude = {
  category: true,
  user: true,
  reviews: { include: { user: true } },
} satisfies Prisma.ServiceInclude;

@Injectable()
export class ServicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageKit: ImageKitService,
  ) {}

  findAll() {
    return this.prisma.service.findMany({ include: serviceInclude });
  }

  async findOne(id: number) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: serviceInclude,
    });
    if (!service) throw new NotFoundException('Service was not found.');
    return service;
  }

  findByCategory(categoryId: number) {
    return this.prisma.service.findMany({
      where: { categoryId },
      include: serviceInclude,
    });
  }

  findBySeller(sellerId: number) {
    return this.prisma.service.findMany({
      where: { userId: sellerId },
      include: serviceInclude,
    });
  }

  findLatestByCategory(categoryId: number, take = 4) {
    return this.prisma.service.findMany({
      where: { categoryId },
      orderBy: { createdAt: 'desc' },
      take,
      include: serviceInclude,
    });
  }

  async create(
    dto: CreateServiceDto,
    sellerId: number,
    files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Upload at least one image of the Service');
    }

    const category = await this.prisma.category.findUnique({
      where: { categoryName: dto.categoryName },
    });
    if (!category) throw new NotFoundException('Category does not exist.');

    const images = await this.imageKit.uploadMany(files, 'connect-services');

    const createdService = await this.prisma.service.create({
      data: {
        name: dto.name,
        price: parseFloat(dto.price),
        description: dto.description,
        keywords: this.parseKeywords(dto.keywords),
        time: dto.time,
        extras: this.parseExtras(dto.extras),
        images: images as unknown as Prisma.InputJsonValue,
        categoryId: category.id,
        userId: sellerId,
      },
      include: { category: true, user: true },
    });

    return { message: 'Service was created successfully!', createdService };
  }

  async update(
    id: number,
    dto: UpdateServiceDto,
    files: Express.Multer.File[],
    requester: Requester,
  ) {
    const service = await this.findOne(id);
    this.assertOwner(service.userId, requester);

    let categoryId = service.categoryId;
    if (dto.categoryName) {
      const category = await this.prisma.category.findUnique({
        where: { categoryName: dto.categoryName },
      });
      if (!category) throw new NotFoundException('Category does not exist.');
      categoryId = category.id;
    }

    // New images are appended to the existing set (matches original behavior).
    const existingImages = (service.images as unknown as UploadedImage[]) ?? [];
    const newImages = files?.length
      ? await this.imageKit.uploadMany(files, 'connect-services')
      : [];
    const images = [...existingImages, ...newImages];

    const updatedService = await this.prisma.service.update({
      where: { id },
      data: {
        name: dto.name ?? service.name,
        price: dto.price ? parseFloat(dto.price) : service.price,
        description: dto.description ?? service.description,
        keywords: dto.keywords
          ? this.parseKeywords(dto.keywords)
          : (service.keywords as Prisma.InputJsonValue),
        time: dto.time ?? service.time,
        extras: dto.extras
          ? this.parseExtras(dto.extras)
          : (service.extras as Prisma.InputJsonValue),
        images: images as unknown as Prisma.InputJsonValue,
        categoryId,
      },
      include: { category: true, user: true },
    });

    return { message: 'Service updated successfully!', updatedService };
  }

  async remove(id: number, requester: Requester) {
    const service = await this.findOne(id);
    this.assertOwner(service.userId, requester);

    const deletedService = await this.prisma.service.delete({
      where: { id },
      include: { category: true, user: true },
    });

    const images = (deletedService.images as unknown as UploadedImage[]) ?? [];
    const fileIds = images.map((image) => image.fileId).filter(Boolean);
    if (fileIds.length) await this.imageKit.delete(fileIds);

    return { message: 'Service was deleted successfully!', deletedService };
  }

  // Only the seller who owns the service (or an admin) may mutate it.
  private assertOwner(ownerId: number | null, requester: Requester) {
    const isPrivileged =
      requester.role === 'admin' || requester.role === 'superAdmin';
    if (ownerId !== requester.id && !isPrivileged) {
      throw new ForbiddenException('You can only modify your own service');
    }
  }

  private parseKeywords(keywords?: string): Prisma.InputJsonValue {
    return keywords ? keywords.split(',').map((k) => k.trim()) : [];
  }

  private parseExtras(extras?: string): Prisma.InputJsonValue {
    if (!extras) return [];
    try {
      return JSON.parse(extras);
    } catch {
      throw new BadRequestException('extras must be valid JSON');
    }
  }
}
