import { BadRequestException, Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Product } from './entities/product.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from 'src/category/category.service';
import { SupplierService } from 'src/supplier/supplier.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class ProductService extends GenericService<Product> {
  constructor(
    @InjectRepository(Product)
    protected readonly repository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly supplierService: SupplierService,
    private readonly fileUploadService: FileUploadService,
  ) {
    super(repository);
  }

  async upload(file: any) {
    const data: any[] = this.fileUploadService.convertToJson(file);

    for (const product of data) {
      const supplier = await this.supplierService.findOneBy({
        name: product.supplier,
      });
      const category = await this.categoryService.findOneBy({
        name: product.category,
      });

      await this.create({
        ...product,
        refrigerated: product.refrigerated ? true : false,
        categoryId: category?.id,
        supplierId: supplier?.id,
        supplier: undefined,
        category: undefined,
      });
    }
  }

  override async create(dto: CreateProductDto): Promise<ObjectLiteral> {
    const category = await this.categoryService.findOne(dto.categoryId);
    const supplier = await this.supplierService.findOne(dto.supplierId);

    if (!category) throw new BadRequestException('Categoria nao encontrada');
    if (!supplier) throw new BadRequestException('Fornecedor nao encontrado');
    const prevProduct = await this.findOneBy({ name: dto.name });

    if (prevProduct) throw new BadRequestException('Produto já existente');

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

  async update(
    id: string,
    dto: UpdateProductDto,
  ): Promise<ObjectLiteral | null> {
    const category =
      (await this.categoryService.findOne(dto.categoryId ?? '')) ?? undefined;
    const supplier =
      (await this.supplierService.findOne(dto.supplierId ?? '')) ?? undefined;

    const product = {
      ...dto,
      category,
      supplier,
      supplierName: supplier?.name ?? undefined,
      categoryName: category?.name ?? undefined,
      supplierId: undefined,
      categoryId: undefined,
    };
    await this.repository.update(id, product);
    return this.findOne(id);
  }
}
