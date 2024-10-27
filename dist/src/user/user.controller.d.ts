import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(body: CreateUserDto, XToken: any): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        address: string | null;
        phone: string;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        userLevel: import(".prisma/client").$Enums.userLevel;
        createdAt: Date;
    }>;
    getUser(): Promise<{
        data: {
            name: string;
            email: string;
        };
    }>;
    getById(id: number): Promise<{
        data: {
            name: string;
            email: string;
            phone: string;
        }[];
    }>;
}
