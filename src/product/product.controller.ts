import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './models/product-create.dto';
import { Param } from '@nestjs/common';
import { ProductUpdateDto } from './models/product-update.dto';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService){

    }

    @Get()
    async all(@Query('page') page = 1){
        return this.productService.paginate(page);
    }

    @Post()
    async create(@Body() body: ProductCreateDto ){
        return this.productService.create(body);
    }

    @Get(':id')
    async getProduct(@Param('id') id: number) {
        return this.productService.findOneBy({id})
    }

    @Put(':id')
    async updateProduct(
        @Param('id') id: number,
        @Body() body: ProductUpdateDto
    ){
        await this.productService.update(id, body);

        return this.productService.findOneBy({id})
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: number){
        return this.productService.delete(id);
    }


}
