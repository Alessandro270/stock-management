import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { GenericService } from 'src/generic/generic.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderService extends GenericService<Order> {
  constructor(
    @InjectRepository(Order)
    protected readonly repository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {
    super(repository);
  }

  override async create(dto: CreateOrderDto): Promise<ObjectLiteral> {
    const order = this.repository.create({ ...dto });
    order.details = await Promise.all(
      dto.details.map(async detail => {
        const newDetail = this.orderDetailRepository.create({
          ...detail,
          order,
          total: detail.quantity,
        });
        return await this.orderDetailRepository.save(newDetail);
      }),
    );
    await this.repository.save(order);
    return order;
  }
}
