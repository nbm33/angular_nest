import { Repository } from 'typeorm';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserEntity } from './models/user.entity';
import { User } from './models/user.interface';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    all(): Promise<User[]>;
    paginate(page?: number): Promise<any>;
    create(user: User): Promise<User>;
    findOneBy(condition: any): Promise<User>;
    update(id: number, data: any): Promise<any>;
    updateUser(id: number, data: UserUpdateDto): Promise<any>;
    deleteUser(id: number): Promise<any>;
}
