import { GenericEntity } from 'src/generic/generic.entity';
import { Entity, ManyToOne, Column } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { DeliveryStatus } from 'src/common/enums/delivery-status.dto';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Delivery extends GenericEntity {
  @ManyToOne(() => Customer, customer => customer.deliveries)
  customer: Customer;

  @ManyToOne(() => Product, product => product.orders)
  product: Product;

  @Column()
  expectedDate: Date;

  @Column({ nullable: true })
  actualDate: Date;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDING,
  })
  status: DeliveryStatus;

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

  @Column()
  customerName: string;

  @Column({ nullable: true })
  description: string;
}
