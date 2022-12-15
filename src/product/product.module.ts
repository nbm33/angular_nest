import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.emtity';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [ProductController, UploadController],
  providers: [ProductService]
})
export class ProductModule {}
