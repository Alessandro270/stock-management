import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Stock } from './entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { ProductService } from 'src/product/product.service';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class StockService extends GenericService<Stock> {
  constructor(
    @InjectRepository(Stock)
    protected readonly repository: Repository<Stock>,
    private readonly productService: ProductService,
    private readonly warehouseService: WarehouseService,
    private readonly fileUploadService: FileUploadService,
  ) {
    super(repository);
  }

  async upload(file: any) {
    const data: any[] = this.fileUploadService.convertToJson(file);

    for (const stock of data) {
      const product = await this.productService.findOneBy({
        name: stock.product,
      });
      const warehouse = await this.warehouseService.findOneBy({
        name: stock.warehouse,
      });

      await this.create({
        ...stock,
        productId: product?.id,
        warehouseId: warehouse?.id,
      });
    }

    return { message: 'Ficheiro carregado com sucesso!' };
  }

  override async create(dto: CreateStockDto): Promise<ObjectLiteral | null> {
    const product = await this.productService.findOne(dto.productId);
    const warehouse = await this.warehouseService.findOne(dto.warehouseId);

    if (!product) throw new NotFoundException('Produto nao encontrado');
    if (!warehouse) throw new NotFoundException('Armazem nao encontrado');

    const qb = this.repository.createQueryBuilder('stock');
    const stock = await qb
      .leftJoinAndSelect('stock.product', 'product')
      .leftJoinAndSelect('stock.warehouse', 'warehouse')
      .where('product.id = :productId', {
        productId: product.id,
      })
      .andWhere('warehouse.id = :warehouseId', {
        warehouseId: warehouse.id,
      })
      .getOne();

    if (stock) {
      await this.repository.update(stock.id, {
        quantity: stock.quantity + dto.quantity,
        warehouse,
      });

      return await this.findOne(stock.id);
    }
    const newStock = this.repository.create({ ...dto, product, warehouse });
    await this.repository.save(newStock);
    return newStock;
  }

  override async update(
    id: string,
    dto: UpdateStockDto,
  ): Promise<ObjectLiteral | null> {
    const product = dto.productId
      ? await this.productService.findOne(dto.productId)
      : undefined;
    const warehouse = dto.warehouseId
      ? await this.warehouseService.findOne(dto.warehouseId)
      : undefined;

    const stock = {
      ...dto,
      productId: undefined,
      warehouseId: undefined,
      product: product || undefined,
      warehouse: warehouse || undefined,
    };
    await this.repository.update(id, stock);
    const res = await this.findOne(id, ['warehouse', 'product']);
    console.log(res, stock);
    return res;
  }
}
