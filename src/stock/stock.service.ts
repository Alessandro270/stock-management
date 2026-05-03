import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Stock } from './entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StockService extends GenericService<Stock> {
  constructor(
    @InjectRepository(Stock)
    protected readonly repository: Repository<Stock>,
  ) {
    super(repository);
  }
}
