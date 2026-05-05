import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/generic/generic.service';

@Injectable()
export class SupplierService extends GenericService<Supplier> {
  constructor(
    @InjectRepository(Supplier)
    protected readonly repository: Repository<Supplier>,
  ) {
    super(repository);
  }
}
