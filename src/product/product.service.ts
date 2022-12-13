import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './models/product.emtity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>){   
    }

    async getall(): Promise<Product[]>{
        return await this.productRepository.find();
    }

    async paginate(page = 1): Promise<any>{
        const take = 5; //paginas por hoja

        const [products, total] = await this.productRepository.findAndCount({
            take, 
            skip: (page -1) * take
        });

        return {
            data: products,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take) 
            }
        }
    }

    async findOneBy(condition): Promise<Product>{
        return await this.productRepository.findOne(condition);
    }

    async create(data): Promise<Product>{
        return await this.productRepository.save(data);
    }

    async update(id: number, data): Promise<any>{
        return await this.productRepository.update(id, data);
    }

    async delete(id: number): Promise<any>{
        const productDelete = await this.productRepository.findOne(id);

        return this.productRepository.delete(productDelete);
    }
}
