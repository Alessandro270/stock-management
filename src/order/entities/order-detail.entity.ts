import { Order } from './order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { GenericEntity } from 'src/generic/generic.entity';

@Entity()
export class OrderDetail extends GenericEntity {
  @ManyToOne(() => Order, (order) => order.details)
  order: Order;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  expectedDate: Date;

  @Column()
  actualDate: Date;
}
