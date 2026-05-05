import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { DeliveryDetail } from './entities/delivery-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery, DeliveryDetail])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
