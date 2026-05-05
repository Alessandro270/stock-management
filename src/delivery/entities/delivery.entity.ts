import { GenericEntity } from 'src/generic/generic.entity';
import { Entity, OneToMany } from 'typeorm';
import { DeliveryDetail } from './delivery-details.entity';

@Entity()
export class Delivery extends GenericEntity {
  @OneToMany(() => DeliveryDetail, (deliveryDetail) => deliveryDetail.delivery)
  details: DeliveryDetail[];
}
