import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
