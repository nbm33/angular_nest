import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    register(body: RegisterDto): Promise<import("./models/user.interface").User>;
    login(body: LoginDto, response: Response): Promise<import("./models/user.interface").User>;
    user(request: Request): Promise<import("./models/user.interface").User>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
