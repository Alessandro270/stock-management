import { Category } from 'src/category/entities/category.entity';
import { Delivery } from 'src/delivery/entities/delivery.entity';
import { GenericEntity } from 'src/generic/generic.entity';
import { Order } from 'src/order/entities/order.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Transfer } from 'src/transfer/entities/transfer.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Product extends GenericEntity {
  @Column()
  name: string;

  @ManyToOne(() => Supplier, supplier => supplier.products, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  supplier: Supplier;

  @OneToMany(() => Order, order => order.product)
  orders: Order[];

  @ManyToOne(() => Category, category => category.products, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  length: number;

  @Column()
  weight: number;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column()
  purchasePrice: number;

  @Column()
  salePrice: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  refrigerated: boolean;

  @Column({ nullable: true })
  sku: string;

  @Column({ nullable: true })
  categoryName: string;

  @Column({ nullable: true })
  supplierName: string;

  @OneToMany(() => Stock, stock => stock.product)
  stocks: Stock[];

  @OneToMany(() => Delivery, deliveries => deliveries.product)
  deliveries: Delivery[];

  @OneToMany(() => Transfer, transfer => transfer.product)
  transfers: Transfer[];
}
