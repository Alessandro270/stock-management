import { GenericEntity } from 'src/generic/generic.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Customer extends GenericEntity {
  @Column()
  name: string;

  @Column()
  address: string;
}
