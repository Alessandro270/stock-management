import { GenericEntity } from 'src/generic/generic.entity';
import { Entity, ManyToOne, OneToMany, Column } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Entity()
export class Order extends GenericEntity {
  @OneToMany(() => OrderDetail, detail => detail.order)
  details: OrderDetail[];

  @ManyToOne(() => Supplier, supplier => supplier.orders)
  supplier?: Supplier;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer?: Customer;

  @Column()
  expectedDate: Date;

  @Column()
  actualDate: Date;
}
