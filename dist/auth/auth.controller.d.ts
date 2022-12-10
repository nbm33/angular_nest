import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { User } from './models/user.interface';
import { UserUpdateDto } from './dto/user-update.dto';
export declare class AuthController {
    private authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    register(body: RegisterDto): Promise<User>;
    login(email: string, password: string, response: Response): Promise<User>;
    user(request: Request): Promise<User>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    all(page?: number): Promise<User[]>;
    userUpdate(id: number, body: UserUpdateDto): Promise<User>;
    Delete(id: number): Promise<any>;
}
