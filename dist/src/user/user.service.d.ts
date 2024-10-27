import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(): Promise<{
        data: {
            name: string;
            email: string;
        };
    }>;
    create(data: CreateUserDto): Promise<{
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
    getById(id: number): Promise<{
        data: {
            name: string;
            email: string;
            phone: string;
        }[];
    }>;
}
