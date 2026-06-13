import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { WarehouseModule } from 'src/warehouse/warehouse.module';
import { ProductModule } from 'src/product/product.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [WarehouseModule, FileUploadModule, ProductModule, TypeOrmModule.forFeature([Stock])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
