import { BadRequestException, Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Category } from './entities/category.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class CategoryService extends GenericService<Category> {
  constructor(
    @InjectRepository(Category)
    protected readonly repository: Repository<Category>,
    private readonly fileUploadService: FileUploadService,
  ) {
    super(repository);
  }

  async upload(file: any) {
    const rows: any[] = this.fileUploadService.convertToJson(file);
    for (const row of rows) await this.create(row);
  }

  override async create(data: CreateCategoryDto): Promise<ObjectLiteral> {
    const category = await this.repository.findOneBy({ name: data.name });
    if (category) throw new BadRequestException('Categoria ja existente');
    const entity = this.repository.create(data);
    await this.repository.save(entity);
    return entity;
  }
}
