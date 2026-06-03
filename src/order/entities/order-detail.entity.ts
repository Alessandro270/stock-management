import { Order } from './order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';

@Entity()
export class OrderDetail extends GenericEntity {
  @ManyToOne(() => Order, order => order.details)
  order: Order;

  @Column()
  product: string;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  total: number;
}
