import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
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
  @IsNotEmpty()
  productId: string;
}
