import { Injectable } from '@nestjs/common';
import { Delivery } from './entities/delivery.entity';
import { GenericService } from 'src/generic/generic.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeliveryService extends GenericService<Delivery> {
  constructor(
    @InjectRepository(Delivery)
    protected readonly repository: Repository<Delivery>,
  ) {
    super(repository);
  }
}
