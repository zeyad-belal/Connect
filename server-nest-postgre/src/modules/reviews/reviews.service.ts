import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

type Requester = Pick<User, 'id' | 'role'>;

const reviewInclude = {
  user: true,
  seller: true,
  service: true,
} satisfies Prisma.ReviewInclude;

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  findByService(serviceId: number) {
    return this.prisma.review.findMany({
      where: { serviceId },
      include: reviewInclude,
    });
  }

  findBySeller(sellerId: number) {
    return this.prisma.review.findMany({
      where: { sellerId },
      include: reviewInclude,
    });
  }

  async create(dto: CreateReviewDto, reviewerId: number) {
    const service = await this.prisma.service.findUnique({
      where: { id: dto.serviceId },
    });
    if (!service) throw new NotFoundException('Please provide a valid serviceId');

    return this.prisma.review.create({
      data: {
        rating: dto.rating,
        reviewTitle: dto.reviewTitle,
        reviewDescription: dto.reviewDescription,
        userId: reviewerId,
        sellerId: dto.sellerId,
        serviceId: dto.serviceId,
      },
      include: reviewInclude,
    });
  }

  async update(id: number, dto: UpdateReviewDto, requester: Requester) {
    await this.ensureOwner(id, requester);
    const updatedReview = await this.prisma.review.update({
      where: { id },
      data: {
        rating: dto.rating,
        reviewTitle: dto.reviewTitle,
        reviewDescription: dto.reviewDescription,
      },
      include: reviewInclude,
    });
    return { message: 'Review updated successfully!', updatedReview };
  }

  async remove(id: number, requester: Requester) {
    await this.ensureOwner(id, requester);
    const deletedReview = await this.prisma.review.delete({
      where: { id },
      include: reviewInclude,
    });
    return { message: 'Review deleted successfully!', deletedReview };
  }

  // Only the author (or an admin) may modify/delete a review.
  private async ensureOwner(id: number, requester: Requester) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Please provide a valid review id');

    const isPrivileged =
      requester.role === 'admin' || requester.role === 'superAdmin';
    if (review.userId !== requester.id && !isPrivileged) {
      throw new ForbiddenException('You can only modify your own review');
    }
    return review;
  }
}
