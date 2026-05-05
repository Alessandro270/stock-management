import { GenericEntity } from 'src/generic/generic.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Location extends GenericEntity {
  @Column()
  name: string;

  @Column()
  address: string;
}
