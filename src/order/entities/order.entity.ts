import { GenericEntity } from 'src/generic/generic.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Entity()
export class Order extends GenericEntity {
  @OneToMany(() => OrderDetail, (detail) => detail.order)
  details: OrderDetail[];

  @ManyToOne(() => Supplier, (supplier) => supplier.orders)
  supplier: Supplier;
}
