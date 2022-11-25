import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
export declare class AuthInterceptor implements NestInterceptor {
    private jwtService;
    constructor(jwtService: JwtService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
