import { Injectable, NotFoundException } from '@nestjs/common';
import { Delivery } from './entities/delivery.entity';
import { GenericService } from 'src/generic/generic.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { ProductService } from 'src/product/product.service';
import { CustomerService } from 'src/customer/customer.service';
import { SupplierService } from 'src/supplier/supplier.service';

@Injectable()
export class DeliveryService extends GenericService<Delivery> {
  constructor(
    @InjectRepository(Delivery)
    protected readonly repository: Repository<Delivery>,
    private readonly productService: ProductService,
    private readonly customerService: CustomerService,
    private readonly supplierService: SupplierService,
  ) {
    super(repository);
  }
  override async create(dto: CreateDeliveryDto): Promise<ObjectLiteral> {
    const product = await this.productService.findOne(dto.productId);
    if (!product) throw new NotFoundException('Produto não encontrado!');

    let customer = await this.customerService.findOneBy({
      name: dto.customerName,
    });
    if (!customer) {
      customer = await this.customerService.create({
        name: dto.customerName,
        address: dto.address,
        email: dto.customerEmail,
        phone: dto.customerPhone,
      });
    }
    const supplier = await this.supplierService.findOne(product.supplier);

    const delivery = this.repository.create({
      ...dto,
      supplierName: supplier?.name,
      customerName: customer.name,
      productName: product.name,
      total: product.salePrice * dto.quantity,
      customer,
      product,
    });
    await this.repository.save(delivery);
    return delivery;
  }
}
