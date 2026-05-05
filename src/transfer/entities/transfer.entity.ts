import { GenericEntity } from 'src/generic/generic.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Transfer extends GenericEntity {
  @Column()
  quantity: number;

  @Column()
  sentDate: Date;

  @Column({ nullable: true })
  receivedDate: Date;
}
