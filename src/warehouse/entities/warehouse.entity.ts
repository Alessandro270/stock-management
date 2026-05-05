import { GenericEntity } from 'src/generic/generic.entity';
import { Column } from 'typeorm';

export class Warehouse extends GenericEntity {
  @Column()
  name: string;

  @Column()
  refrigerated: boolean;
}
