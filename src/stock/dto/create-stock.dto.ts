import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateStockDto {
  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  minimumStock: number;

  @IsNumber()
  @IsNotEmpty()
  maximumStock: number;

  @IsNumber()
  @IsNotEmpty()
  reorderQuantity: number;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  warehouseId: string;
}
