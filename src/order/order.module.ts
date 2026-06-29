import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductModule } from 'src/product/product.module';
import { SupplierModule } from 'src/supplier/supplier.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { StockModule } from 'src/stock/stock.module';

@Module({
  imports: [
    ProductModule,
    SupplierModule,
    FileUploadModule,
    StockModule,
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
