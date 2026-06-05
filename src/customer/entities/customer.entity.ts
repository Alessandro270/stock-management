import { Delivery } from 'src/delivery/entities/delivery.entity';
import { GenericEntity } from 'src/generic/generic.entity';
import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Customer extends GenericEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @OneToMany(() => Delivery, delivery => delivery.customer)
  deliveries: Delivery[];
}
