import { Order } from './order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class OrderDetail extends GenericEntity {
  @ManyToOne(() => Order, order => order.details)
  order: Order;

  @ManyToOne(() => Product, product => product.orderDetails)
  product: Product;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
