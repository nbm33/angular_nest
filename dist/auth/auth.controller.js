"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const bcrypt = require("bcrypt");
const register_dto_1 = require("./dto/register.dto");
const jwt_1 = require("@nestjs/jwt");
const common_3 = require("@nestjs/common");
const auth_interceptor_1 = require("./auth.interceptor");
const common_4 = require("@nestjs/common");
const user_update_dto_1 = require("./dto/user-update.dto");
let AuthController = class AuthController {
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async register(body) {
        if (body.password !== body.password_confirm) {
            throw new common_1.BadRequestException('Password do not match');
        }
        body.password = await bcrypt.hash(body.password, 12);
        return this.authService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: body.password,
            password_confirm: body.password_confirm,
            role: { id: body.role_id }
        });
    }
    async login(email, password, response) {
        const user = await this.authService.findOneBy({ email });
        try {
            if (!user) {
                throw new common_1.BadRequestException("Email does not exist");
            }
            if (!await bcrypt.compare(password, user.password)) {
                throw new common_1.BadRequestException("Password does not match");
            }
            const jwt = await this.jwtService.signAsync({ id: user.id });
            response.cookie('jwt', jwt, { httpOnly: true });
        }
        catch (error) {
            throw error;
        }
        return user;
    }
    async user(request) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        return this.authService.findOneBy({ id: data['id'] });
    }
    async logout(response) {
        response.clearCookie('jwt');
        return {
            message: 'logout successfully'
        };
    }
    async all(page = 1) {
        return await this.authService.paginate(page);
    }
    async userUpdate(id, body) {
        this.authService.updateUser(id, {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            role: { id: body.role_id }
        });
        return this.authService.findOneBy({ id });
    }
    async Delete(id) {
        return this.authService.deleteUser(id);
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_3.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseInterceptors)(auth_interceptor_1.AuthInterceptor),
    (0, common_2.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "user", null);
__decorate([
    (0, common_1.UseInterceptors)(auth_interceptor_1.AuthInterceptor),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_3.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_2.Get)('users'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "all", null);
__decorate([
    (0, common_4.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_update_dto_1.UserUpdateDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userUpdate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Delete", null);
AuthController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_2.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map