import { Type } from 'class-transformer';
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';

class CheckoutItemDto {
  // Only the service id and quantity are trusted from the client. The name and
  // price are resolved from the database server-side so a tampered request
  // cannot set its own price.
  @IsInt()
  serviceId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateCheckoutDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];
}
