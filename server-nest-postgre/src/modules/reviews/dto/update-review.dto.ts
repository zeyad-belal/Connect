import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  reviewTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  reviewDescription?: string;
}
