import { Repository } from 'typeorm';
import { Role } from './role.entity';
export declare class RoleService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    all(): Promise<Role[]>;
    findOneBy(condition: any): Promise<Role>;
    create(data: any): Promise<Role>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<any>;
}
