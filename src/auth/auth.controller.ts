import { BadRequestException, Body, ClassSerializerInterceptor, Delete, Param, Post, Query, Req, UseInterceptors } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Res } from '@nestjs/common';
import { AuthInterceptor } from './auth.interceptor';
import { Put } from '@nestjs/common';
import { UserUpdateDto } from './dto/user-update.dto';


@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController { 

    constructor(
        private authService: AuthService,
        private jwtService: JwtService
        ){
    }

    @Post('register')
    async register(@Body() body: RegisterDto){
        if(body.password !== body.password_confirm){
            throw new BadRequestException('Password do not match')
        }

        body.password = await bcrypt.hash(body.password, 12); 

        return this.authService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: body.password,
            password_confirm: body.password_confirm,
            role: {id: body.role_id}
        });
    }

    
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ) {
        
        const user = await this.authService.findOneBy({email});

        try{

            if(!user){
                throw new BadRequestException("Email does not exist");
            }

            if(!await bcrypt.compare(password, user.password)){
                throw new BadRequestException("Password does not match");
            }

            const jwt =  await this.jwtService.signAsync({id: user.id});

            response.cookie('jwt', jwt, {httpOnly: true});

        } catch (error){

            throw error

        }

        return user;
    }
    

    @UseInterceptors(AuthInterceptor)
    @Get('user')
    async user(@Req() request: Request){
        const cookie = request.cookies['jwt']; 

        const data = await this.jwtService.verifyAsync(cookie);

        return this.authService.findOneBy({id: data['id']});

    }

    @UseInterceptors(AuthInterceptor)
    @Post('logout')
    async logout(
        @Res({passthrough: true}) response: Response
    ){
        response.clearCookie('jwt');

        return {
            message: 'logout successfully'
        }


    }

    @Get('users')
    async all(@Query('page') page: number = 1){
        return await this.authService.paginate(page, ['role']);
    }

    @Get('user/:id')
    async get(@Param('id') id: number){
        return await this.authService.findOne(id, ['role']);
    }

    @Put('user/:id')
    async userUpdate(
        @Param('id') id: number,
        @Body() body: UserUpdateDto
        ) {

        this.authService.updateUser(id, {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            role: {id: body.role_id}
        });

        return this.authService.findOneBy({id});
    }

    @Delete('user/:id')
    async Delete(
        @Param('id') id: number
    ){
        return this.authService.deleteUser(id);
    }

}
