import { IsInt, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  serviceId: number;

  // The seller being reviewed. The reviewer is taken from the auth token.
  @IsInt()
  sellerId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @MaxLength(100)
  reviewTitle: string;

  @IsString()
  @MaxLength(250)
  reviewDescription: string;
}
