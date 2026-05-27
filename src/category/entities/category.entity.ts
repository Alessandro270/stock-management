import { GenericEntity } from 'src/generic/generic.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends GenericEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
