import { GenericEntity } from 'src/generic/generic.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

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

  @OneToOne(() => Product, (product) => product.stock)
  @JoinColumn()
  product: Product;
}
