import { GenericEntity } from 'src/generic/generic.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Delivery } from './delivery.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class DeliveryDetail extends GenericEntity {
  @ManyToOne(() => Delivery, (delivery) => delivery.details)
  delivery: Delivery;

  @ManyToOne(() => Delivery, (delivery) => delivery.details)
  product: Product;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  expectedDate: Date;

  @Column()
  actualDate: Date;
}
