import { DeliveryDetail } from 'src/delivery/entities/delivery-details.entity';
import { GenericEntity } from 'src/generic/generic.entity';
import { Location } from 'src/location/entities/location.entity';
import { OrderDetail } from 'src/order/entities/order-detail.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Transfer } from 'src/transfer/entities/transfer.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Warehouse extends GenericEntity {
  @Column()
  name: string;

  @Column()
  refrigerated: boolean;

  @ManyToOne(() => Location, (location) => location.warehouses)
  location: Location;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @OneToMany(() => DeliveryDetail, (deliveryDetail) => deliveryDetail.product)
  deliveryDetails: DeliveryDetail[];

  @OneToMany(() => Stock, (stock) => stock.warehouse)
  stocks: Stock[];

  @OneToMany(() => Transfer, (transfer) => transfer.sourceWarehouse)
  sourceTransfers: Transfer[];

  @OneToMany(() => Transfer, (transfer) => transfer.destinationWarehouse)
  destinationTransfers: Transfer[];
}
