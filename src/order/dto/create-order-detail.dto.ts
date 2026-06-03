import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderDetailDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  product: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}
