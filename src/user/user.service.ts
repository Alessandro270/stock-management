import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { GenericService } from 'src/generic/generic.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }

  findOneWithPassword(
    filter: Record<string, any>,
  ): Promise<ObjectLiteral | null> {
    const queryBuilder = this.repository.createQueryBuilder('user');
    return queryBuilder
      .addSelect(['user.password', 'user.refreshToken'])
      .where({ ...filter })
      .getOne();
  }
}
