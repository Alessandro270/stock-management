import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Stock } from './entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { ProductService } from 'src/product/product.service';
import { WarehouseService } from 'src/warehouse/warehouse.service';

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

    console.log(product, warehouse);

    if (!product) throw new NotFoundException('Produto nao encontrado');
    if (!warehouse) throw new NotFoundException('Armazem nao encontrado');

    const stock = this.repository.create({ ...dto, product, warehouse });
    await this.repository.save(stock);
    return stock;
  }
}
