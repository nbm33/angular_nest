import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
export declare class PermissionService {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    all(): Promise<Permission[]>;
}
