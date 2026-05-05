import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic/generic.service';

@Injectable()
export class OrderService extends GenericService<Order> {
  constructor(
    @InjectRepository(Order)
    protected readonly repository: Repository<Order>,
  ) {
    super(repository);
  }
}
