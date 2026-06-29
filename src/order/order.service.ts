import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { GenericService } from 'src/generic/generic.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from 'src/product/product.service';
import { SupplierService } from 'src/supplier/supplier.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from 'src/common/enums/order-status.dto';
import { StockService } from 'src/stock/stock.service';

@Injectable()
export class OrderService extends GenericService<Order> {
  constructor(
    @InjectRepository(Order)
    protected readonly repository: Repository<Order>,
    private readonly productService: ProductService,
    private readonly supplierService: SupplierService,
    private readonly stockService: StockService,
  ) {
    super(repository);
  }

  override async update(
    id: string,
    dto: UpdateOrderDto,
  ): Promise<ObjectLiteral | null> {
    const oldOrder = await this.findOne(id);

    if (!oldOrder) throw new NotFoundException('Compra não encontrada');

    const product = await this.productService.findOne(dto.productId ?? '');
    const supplier = await this.supplierService.findOne(dto.supplierId ?? '');
    console.log('old: ', oldOrder);
    if (dto.status === OrderStatus.COMPLETED) {
      const stock = await this.stockService.findOneBy({
        product: { name: oldOrder.productName },
      });

      if (!stock) throw new NotFoundException('Estoque inexistente');
      const quantity = stock.quantity + oldOrder.quantity;
      const res = await this.stockService.update(stock?.id, {
        quantity,
      });
    }
    const newOrder = {
      ...dto,
      supplierId: undefined,
      productId: undefined,
      actualDate: dto.status === 'completed' ? new Date() : undefined,
      total:
        product?.purchasePrice && dto.quantity
          ? product.purchasePrice * dto.quantity
          : undefined,
      productName: product?.name,
      supplierName: supplier?.name,
      product: product ?? undefined,
      supplier: { id: dto.supplierId ?? undefined },
    };

    await this.repository.update(id, newOrder);
    return this.findOne(id);
  }

  override async create(dto: CreateOrderDto): Promise<ObjectLiteral> {
    const product = await this.productService.findOne(dto.productId);
    if (!product) throw new NotFoundException('Produto nao encontrado');

    const supplier = await this.supplierService.findOne(dto.supplierId);
    if (!supplier) throw new NotFoundException('Fornecedor nao encontrado');

    const order = this.repository.create({
      ...dto,
      product,
      supplier,
      price: product.purchasePrice,
      productName: product.name,
      supplierName: supplier.name,
      total: product.purchasePrice * dto.quantity,
    });
    await this.repository.save(order);
    return order;
  }
}
