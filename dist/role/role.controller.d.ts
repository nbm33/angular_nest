import { Role } from './role.entity';
import { RoleService } from './role.service';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    all(): Promise<Role[]>;
    get(id: number): Promise<Role>;
    create(name: string): Promise<Role>;
    update(id: number, name: string): Promise<Role>;
    delete(id: number): Promise<any>;
}
