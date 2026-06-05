import { Delivery } from 'src/delivery/entities/delivery.entity';
import { GenericEntity } from 'src/generic/generic.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Transfer } from 'src/transfer/entities/transfer.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Warehouse extends GenericEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  refrigerated: boolean;

  @Column()
  address: string;

  @Column()
  capacity: number;

  @OneToMany(() => Stock, stock => stock.warehouse)
  stocks: Stock[];

  @OneToMany(() => Delivery, delivery => delivery.product)
  deliveries: Delivery[];

  @OneToMany(() => Transfer, transfer => transfer.sourceWarehouse)
  sourceTransfers: Transfer[];

  @OneToMany(() => Transfer, transfer => transfer.destinationWarehouse)
  destinationTransfers: Transfer[];
}
