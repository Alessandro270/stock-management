import { GenericEntity } from 'src/generic/generic.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Column, Entity, OneToOne } from 'typeorm';

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

  @OneToOne(() => Stock, (stock) => stock.product)
  stock: Stock;
}
