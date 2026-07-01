import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Was a GET with serviceId in the body; now a conventional query param.
  @Get()
  findByService(@Query('serviceId', ParseIntPipe) serviceId: number) {
    return this.reviewsService.findByService(serviceId);
  }

  @Get('sellerReviews/:id')
  findBySeller(@Param('id', ParseIntPipe) sellerId: number) {
    return this.reviewsService.findBySeller(sellerId);
  }

  @Post()
  create(@Body() dto: CreateReviewDto, @CurrentUser('id') reviewerId: number) {
    return this.reviewsService.create(dto, reviewerId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReviewDto,
    @CurrentUser() requester: User,
  ) {
    return this.reviewsService.update(id, dto, requester);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() requester: User) {
    return this.reviewsService.remove(id, requester);
  }
}
