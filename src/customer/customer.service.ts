import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic/generic.service';

@Injectable()
export class CustomerService extends GenericService<Customer> {
  constructor(
    @InjectRepository(Customer)
    protected readonly repository: Repository<Customer>,
  ) {
    super(repository);
  }
}
