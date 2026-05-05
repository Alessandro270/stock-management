import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTransferDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsDateString()
  @IsNotEmpty()
  sentDate: Date;

  @IsString()
  @IsOptional()
  receivedDate: Date;
}
