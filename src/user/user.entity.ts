import { GenericEntity } from 'src/generic/generic.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class User extends GenericEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
