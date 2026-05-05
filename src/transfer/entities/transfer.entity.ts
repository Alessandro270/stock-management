import { GenericEntity } from 'src/generic/generic.entity';
import { Product } from 'src/product/entities/product.entity';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Transfer extends GenericEntity {
  @Column()
  quantity: number;

  @Column()
  sentDate: Date;

  @Column({ nullable: true })
  receivedDate: Date;

  @ManyToOne(() => Product, (product) => product.transfers)
  product: Product;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.sourceTransfers)
  sourceWarehouse: Warehouse;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.destinationTransfers)
  destinationWarehouse: Warehouse;
}
