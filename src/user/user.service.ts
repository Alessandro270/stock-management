import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { GenericService } from 'src/generic/generic.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }
}
