import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  address: string;
}
