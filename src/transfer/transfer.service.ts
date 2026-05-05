import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from './entities/transfer.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic/generic.service';

@Injectable()
export class TransferService extends GenericService<Transfer> {
  constructor(
    @InjectRepository(Transfer)
    protected readonly repository: Repository<Transfer>,
  ) {
    super(repository);
  }
}
