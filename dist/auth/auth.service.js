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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./models/user.entity");
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async all() {
        return await this.userRepository.find();
    }
    async paginate(page = 1, relations = []) {
        const take = 5;
        const [users, total] = await this.userRepository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations
        });
        return {
            data: users,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        };
    }
    async create(data) {
        return await this.userRepository.save(data);
    }
    async findOneBy(condition) {
        const user = await this.userRepository.findOne(condition);
        return user;
    }
    async findOne(condition, relations = []) {
        const user = await this.userRepository.findOne(condition, { relations });
        return user;
    }
    async update(id, data) {
        return await this.userRepository.update(id, data);
    }
    async updateUser(id, data) {
        const userUpdate = await this.userRepository.findOne(id);
        userUpdate.first_name = data.first_name;
        userUpdate.last_name = data.last_name;
        userUpdate.email = data.email;
        userUpdate.role = data.role;
        return this.userRepository.save(userUpdate);
    }
    async deleteUser(id) {
        const userDelete = await this.userRepository.findOne(id);
        return this.userRepository.delete(userDelete);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map