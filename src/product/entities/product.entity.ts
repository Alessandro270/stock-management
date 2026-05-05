import { DeliveryDetail } from 'src/delivery/entities/delivery-details.entity';
import { Delivery } from 'src/delivery/entities/delivery.entity';
import { GenericEntity } from 'src/generic/generic.entity';
import { OrderDetail } from 'src/order/entities/order-detail.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Transfer } from 'src/transfer/entities/transfer.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Product extends GenericEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  unitPrice: number;

  @Column()
  category: string;

  @Column()
  sku: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  refrigerated: boolean;

  @Column({ nullable: true })
  expiresAt: Date;

  @OneToMany(() => Stock, (stock) => stock.product)
  stocks: Stock[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @OneToMany(() => DeliveryDetail, (deliveryDetails) => deliveryDetails.product)
  deliveryDetails: DeliveryDetail[];

  @OneToMany(() => Transfer, (transfer) => transfer.product)
  transfers: Transfer[];
}
