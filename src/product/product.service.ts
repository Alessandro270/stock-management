import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Product } from './entities/product.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from 'src/category/category.service';
import { SupplierService } from 'src/supplier/supplier.service';

@Injectable()
export class ProductService extends GenericService<Product> {
  constructor(
    @InjectRepository(Product)
    protected readonly repository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly supplierService: SupplierService,
  ) {
    super(repository);
  }
  override async create(dto: CreateProductDto): Promise<ObjectLiteral> {
    const category = await this.categoryService.findOne(dto.categoryId);
    const supplier = await this.supplierService.findOne(dto.supplierId);

    if (!category) throw new NotFoundException('Categoria nao encontrada');
    if (!supplier) throw new NotFoundException('Fornecedor nao encontrado');

    const product = this.repository.create({
      ...dto,
      category,
      supplier,
      supplierName: supplier.name,
      categoryName: category.name,
    });
    await this.repository.save(product);
    return product;
  }
}
