import { GenericEntity } from 'src/generic/generic.entity';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Location extends GenericEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Warehouse, (warehouse) => warehouse.location)
  warehouses: Warehouse[];
}
