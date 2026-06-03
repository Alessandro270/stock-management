import { GenericEntity } from 'src/generic/generic.entity';
import { Entity, ManyToOne, OneToMany, Column } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { OrderStatus } from 'src/common/enums/order-status.dto';

@Entity('orders')
export class Order extends GenericEntity {
  @OneToMany(() => OrderDetail, detail => detail.order, { onDelete: 'CASCADE' })
  details: OrderDetail[];

  @ManyToOne(() => Supplier, supplier => supplier.orders)
  supplier: Supplier;

  @Column()
  expectedDate: Date;

  @Column({ nullable: true })
  actualDate: Date;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}
