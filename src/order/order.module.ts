import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forFeature([Supplier, Order, OrderDetail]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
