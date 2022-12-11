import { PermissionService } from './permission.service';
export declare class PermissionController {
    private permissionService;
    constructor(permissionService: PermissionService);
    all(): Promise<import("./permission.entity").Permission[]>;
}
