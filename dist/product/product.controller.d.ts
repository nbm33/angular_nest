import { ProductService } from './product.service';
import { ProductCreateDto } from './models/product-create.dto';
import { ProductUpdateDto } from './models/product-update.dto';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    all(page?: number): Promise<any>;
    create(body: ProductCreateDto): Promise<import("./models/product.emtity").Product>;
    getProduct(id: number): Promise<import("./models/product.emtity").Product>;
    updateProduct(id: number, body: ProductUpdateDto): Promise<import("./models/product.emtity").Product>;
    deleteProduct(id: number): Promise<any>;
}
