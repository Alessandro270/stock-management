import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { OrderStatus } from 'src/common/enums/order-status.dto';

export class CreateOrderDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  supplierId: string;

  @IsDateString()
  @IsNotEmpty()
  expectedDate: Date;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsOptional()
  @IsDateString()
  actualDate: Date;

  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;
}
