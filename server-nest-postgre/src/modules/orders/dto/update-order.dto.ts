import { IsArray, IsBoolean, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateOrderStatusDto {
  @IsEnum(Status)
  status: Status;
}

export class UpdateOrderChatDto {
  @IsArray()
  chatHistory: unknown[];
}

export class UpdateOrderReviewedDto {
  @IsBoolean()
  reviewed: boolean;
}
