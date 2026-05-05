import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic/generic.service';

@Injectable()
export class WarehouseService extends GenericService<Warehouse> {
  constructor(
    @InjectRepository(Warehouse)
    protected readonly repository: Repository<Warehouse>,
  ) {
    super(repository);
  }
}
