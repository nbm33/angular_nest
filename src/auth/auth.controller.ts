import { BadRequestException, Body, ClassSerializerInterceptor, Post, Req, UseInterceptors } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthInterceptor } from './auth.interceptor';

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

        body.password = await bcrypt.hash(body.password, 12)

        return this.authService.create(body);
    }

    //@Body('email') email: string,
    //@Body('password') password: string,
    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Res({passthrough: true}) response: Response
    ) {
        
        const user = await this.authService.findOneBy(body.email);

        try{

            if(!user){
                throw new BadRequestException("Email does not exist");
            }

            if(!await bcrypt.compare(body.password, user.password)){
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



}
