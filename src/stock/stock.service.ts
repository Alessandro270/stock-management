import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Stock } from './entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { ProductService } from 'src/product/product.service';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { urlToHttpOptions } from 'url';

@Injectable()
export class StockService extends GenericService<Stock> {
  constructor(
    @InjectRepository(Stock)
    protected readonly repository: Repository<Stock>,
    private readonly productService: ProductService,
    private readonly warehouseService: WarehouseService,
  ) {
    super(repository);
  }

  override async create(dto: CreateStockDto): Promise<ObjectLiteral> {
    const product = await this.productService.findOne(dto.productId);
    const warehouse = await this.warehouseService.findOne(dto.warehouseId);

    if (!product) throw new NotFoundException('Produto nao encontrado');
    if (!warehouse) throw new NotFoundException('Armazem nao encontrado');

    const stock = this.repository.create({ ...dto, product, warehouse });
    await this.repository.save(stock);
    return stock;
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
