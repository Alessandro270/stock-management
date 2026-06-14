import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/generic/generic.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class SupplierService extends GenericService<Supplier> {
  constructor(
    @InjectRepository(Supplier)
    protected readonly repository: Repository<Supplier>,
    private readonly fileUploadService: FileUploadService
  ) {
    super(repository);
  }
  async upload(file: any) {
    const rows: any[] = this.fileUploadService.convertToJson(file);
    for (const row of rows) await this.create(row);
  }
}
