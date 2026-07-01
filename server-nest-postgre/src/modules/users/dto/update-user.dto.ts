import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  // role is intentionally not editable here — only the admin-only dashboard
  // route (DashboardUpdateUserDto) may change a user's role.
  @IsOptional()
  @IsString()
  bio?: string;

  // Present when the client keeps/clears an existing avatar without uploading
  // a new file. A new file upload overrides these.
  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  avatarID?: string;
}
