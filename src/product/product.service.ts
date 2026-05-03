import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService extends GenericService<Product> {
  constructor(
    @InjectRepository(Product)
    protected readonly repository: Repository<Product>,
  ) {
    super(repository);
  }
}
