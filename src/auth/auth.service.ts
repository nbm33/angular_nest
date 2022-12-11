import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserEntity } from './models/user.entity';
import { User } from './models/user.interface';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){   
    }

    async all(): Promise<User[]>{
        return await this.userRepository.find();
    }

    async paginate(page = 1): Promise<any>{
        const take = 5; //paginas por hoja

        const [users, total] = await this.userRepository.findAndCount({
            take, 
            skip: (page -1) * take
        });

        return {
            data: users,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take) 
            }
        }
    }

    async create(data): Promise<User>{
        return await this.userRepository.save(data);
    }

    async findOneBy(condition): Promise<User>{
        const user = await this.userRepository.findOne(condition);
        return user;
    }

    async update(id: number, data): Promise<any>{
        return await this.userRepository.update(id, data);
    }

    async updateUser(id: number, data): Promise<UserUpdateDto>{
        const userUpdate = await this.userRepository.findOne(id);

        userUpdate.first_name = data.first_name;
        userUpdate.last_name = data.last_name;
        userUpdate.email = data.email;
        userUpdate.role = data.role;

        return this.userRepository.save(userUpdate);
    }

    async deleteUser(id: number): Promise<any>{
        const userDelete = await this.userRepository.findOne(id);

        return this.userRepository.delete(userDelete);
    }
}
