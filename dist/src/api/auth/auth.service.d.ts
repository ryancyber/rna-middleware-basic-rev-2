import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prismaService;
    private jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    register(data: AuthRegisterDto): Promise<{
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
    login(data: AuthLoginDto): Promise<{
        accessToken: string;
    }>;
    profile(user_id: number): Promise<{
        name: string;
        email: string;
        address: string;
        phone: string;
        userLevel: import(".prisma/client").$Enums.userLevel;
    }>;
}
