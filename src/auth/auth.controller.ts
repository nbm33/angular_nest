import { Body, Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AuthController { 

    constructor(private authService: AuthService){
    }

    @Post('register')
    async register(@Body() body: any){
        
        const hashed = await bcrypt.hash(body.password, 12)

        return this.authService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: hashed,
        });
    }

}
