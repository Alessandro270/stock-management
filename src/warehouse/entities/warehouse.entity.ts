import { Delivery } from 'src/delivery/entities/delivery.entity';
import { GenericEntity } from 'src/generic/generic.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Warehouse extends GenericEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

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
}
