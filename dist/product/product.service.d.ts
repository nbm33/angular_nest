import { Repository } from 'typeorm';
import { Product } from './models/product.emtity';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    getall(): Promise<Product[]>;
    paginate(page?: number): Promise<any>;
    findOneBy(condition: any): Promise<Product>;
    create(data: any): Promise<Product>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<any>;
}
