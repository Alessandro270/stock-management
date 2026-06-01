import { GenericEntity } from 'src/generic/generic.entity';
import { Entity, ManyToOne, OneToMany, Column } from 'typeorm';
import { DeliveryDetail } from './delivery-details.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Entity()
export class Delivery extends GenericEntity {
  @OneToMany(() => DeliveryDetail, deliveryDetail => deliveryDetail.delivery)
  details: DeliveryDetail[];

  @ManyToOne(() => Customer, customer => customer.deliveries)
  customer: Customer;

  @Column()
  expectedDate: Date;

  @Column()
  actualDate: Date;
}
