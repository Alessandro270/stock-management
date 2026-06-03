import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { GenericService } from 'src/generic/generic.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from 'src/product/product.service';
import { SupplierService } from 'src/supplier/supplier.service';

@Injectable()
export class OrderService extends GenericService<Order> {
  constructor(
    @InjectRepository(Order)
    protected readonly repository: Repository<Order>,
    private readonly productService: ProductService,
    private readonly supplierService: SupplierService,
  ) {
    super(repository);
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
