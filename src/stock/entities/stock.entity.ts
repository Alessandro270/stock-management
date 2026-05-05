import { GenericEntity } from 'src/generic/generic.entity';
import { Product } from 'src/product/entities/product.entity';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Stock extends GenericEntity {
  @Column()
  quantity: number;

  @Column()
  minimumStock: number;

  @Column()
  maximumStock: number;

  @Column()
  reorderQuantity: number;

  @ManyToOne(() => Product, (product) => product.stocks)
  product: Product;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.stocks)
  warehouse: Warehouse;
}
