import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { SupplierModule } from 'src/supplier/supplier.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [
    FileUploadModule,
    CategoryModule,
    SupplierModule,
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
