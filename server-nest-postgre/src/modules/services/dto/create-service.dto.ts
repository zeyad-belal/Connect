import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Service create/update arrives as multipart/form-data (images alongside
 * fields), so every value is a string here. Numeric/JSON parsing happens in the
 * service, mirroring the original Express controller. `categoryName` selects an
 * existing Category by name; the seller is taken from the authenticated user.
 */
export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsOptional()
  @IsString()
  keywords?: string;

  @IsOptional()
  @IsString()
  extras?: string;

  @IsString()
  @IsNotEmpty()
  categoryName: string;
}
