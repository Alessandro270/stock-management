import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateOrderDetailDto } from './create-order-detail.dto';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  details: CreateOrderDetailDto[];

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  supplierId: string;

  @IsDateString()
  @IsNotEmpty()
  expectedDate: Date;
}
