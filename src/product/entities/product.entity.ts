import { Category } from 'src/category/entities/category.entity';
import { DeliveryDetail } from 'src/delivery/entities/delivery-details.entity';
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

  @ManyToOne(() => Supplier, supplier => supplier.products)
  supplier: Supplier;

  @OneToMany(() => Order, order => order.product)
  orders: Order[];

  @ManyToOne(() => Category, category => category.products, { nullable: false })
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

  @OneToMany(() => Stock, stock => stock.product)
  stocks: Stock[];

  @OneToMany(() => DeliveryDetail, deliveryDetails => deliveryDetails.product)
  deliveryDetails: DeliveryDetail[];

  @OneToMany(() => Transfer, transfer => transfer.product)
  transfers: Transfer[];
}
