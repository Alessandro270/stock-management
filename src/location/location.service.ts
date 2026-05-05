import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Location } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService extends GenericService<Location> {
  constructor(
    @InjectRepository(Location)
    protected readonly repository: Repository<Location>,
  ) {
    super(repository);
  }
}
