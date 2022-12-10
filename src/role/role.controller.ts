import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService){
    }

    @Get()
    async all(){
        return this.roleService.all();
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<Role>{
        return this.roleService.findOneBy({id});
    }

    @Post()
    async create(
        @Body('name') name: string
        ){
        return this.roleService.create({name});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('name') name: string
        ){
       
        await this.roleService.update(id, {name});
        return this.roleService.findOneBy({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        return this.roleService.delete(id);
    }
    



}
