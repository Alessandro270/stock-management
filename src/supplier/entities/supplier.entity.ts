import { GenericEntity } from 'src/generic/generic.entity';
import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Supplier extends GenericEntity {
  @OneToMany(() => Order, (order) => order.supplier)
  orders: Order[];

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;
}
