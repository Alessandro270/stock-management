import { Role } from 'src/common/enums/role.enum';
import { GenericEntity } from 'src/generic/generic.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class User extends GenericEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ nullable: true, select: false })
  refreshToken: string;
}
