import { BadRequestException, Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Category } from './entities/category.entity';
import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService extends GenericService<Category> {
  constructor(
    @InjectRepository(Category)
    protected readonly repository: Repository<Category>,
  ) {
    super(repository);
  }
  override async create(data: CreateCategoryDto): Promise<ObjectLiteral> {
    const category = await this.repository.findOneBy({ name: data.name });
    if (category) throw new BadRequestException('Categoria ja existente');
    const entity = this.repository.create(data);
    await this.repository.save(entity);
    return entity;
  }
}
