import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic/generic.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class WarehouseService extends GenericService<Warehouse> {
  constructor(
    @InjectRepository(Warehouse)
    protected readonly repository: Repository<Warehouse>,
    private readonly fileUploadService: FileUploadService,
  ) {
    super(repository);
  }
  async upload(file: any) {
    const rows: any[] = this.fileUploadService.convertToJson(file);
    console.log(rows);
    for (const row of rows)
      await this.create({
        ...row,
        refrigerated: row.refrigerated ? true : false,
      });
  }
}
