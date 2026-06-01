import { GenericEntity } from 'src/generic/generic.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Supplier extends GenericEntity {
  @OneToMany(() => Order, order => order.supplier)
  orders: Order[];

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => Product, product => product.supplier)
  products: Product[];

  @OneToMany(() => Order, order => order.supplier)
  Orders: Order[];
}
