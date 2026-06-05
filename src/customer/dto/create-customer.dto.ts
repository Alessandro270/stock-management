import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  address: string;
}
