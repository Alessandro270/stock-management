import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService extends GenericService<Category> {
  constructor(
    @InjectRepository(Category)
    protected readonly repository: Repository<Category>,
  ) {
    super(repository);
  }
}
