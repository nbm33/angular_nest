import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<import("./models/user.interface").User>;
    login(email: string, password: string): Promise<{
        user: import("./models/user.interface").User;
    }>;
}
