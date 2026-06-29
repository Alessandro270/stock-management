import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { ProductModule } from 'src/product/product.module';
import { SupplierModule } from 'src/supplier/supplier.module';
import { StockModule } from 'src/stock/stock.module';

@Module({
  imports: [
    CustomerModule,
    ProductModule,
    SupplierModule,
    StockModule,
    TypeOrmModule.forFeature([Delivery]),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
