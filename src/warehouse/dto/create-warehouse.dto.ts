import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateWarehouseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  refrigerated: boolean;

  @IsString()
  @IsOptional()
  address: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  capacity: number;
}
