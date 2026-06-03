import { GenericEntity } from 'src/generic/generic.entity';
import { Entity, ManyToOne, Column } from 'typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { OrderStatus } from 'src/common/enums/order-status.dto';
import { Product } from 'src/product/entities/product.entity';

@Entity('orders')
export class Order extends GenericEntity {
  @ManyToOne(() => Supplier, supplier => supplier.orders)
  supplier: Supplier;

  @ManyToOne(() => Product, product => product.orders)
  product: Product;

  @Column()
  expectedDate: Date;

  @Column({ nullable: true })
  actualDate: Date;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  total: number;

  @Column()
  productName: string;

  @Column()
  supplierName: string;
}
