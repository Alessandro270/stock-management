import { GenericEntity } from 'src/generic/generic.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Delivery } from './delivery.entity';

@Entity()
export class DeliveryDetail extends GenericEntity {
  @ManyToOne(() => Delivery, (delivery) => delivery.details)
  delivery: Delivery;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  expectedDate: Date;

  @Column()
  actualDate: Date;
}
