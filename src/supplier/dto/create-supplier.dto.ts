import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
