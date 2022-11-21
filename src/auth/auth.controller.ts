import { BadRequestException, Body, Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController { 

    constructor(private authService: AuthService){
    }

    @Post('register')
    async register(@Body() body: RegisterDto){
        if(body.password !== body.password_confirm){
            throw new BadRequestException('Password do not match')
        }

        const hashed = await bcrypt.hash(body.password, 12)

        return this.authService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: hashed,
        });
    }

}
