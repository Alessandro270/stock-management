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
import { DeliveryStatus } from 'src/common/enums/delivery-status.dto';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsOptional()
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  description: string;

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
  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;
}
