import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: AuthRegisterDto): Promise<{
        data: {
            id: number;
            name: string;
            email: string;
            password: string;
            address: string | null;
            phone: string;
            data: import("@prisma/client/runtime/library").JsonValue | null;
            userLevel: import(".prisma/client").$Enums.userLevel;
            createdAt: Date;
        };
        message: string;
    }>;
    login(body: AuthLoginDto): Promise<{
        data: {
            accessToken: string;
        };
        message: string;
    }>;
    profile(req: any): Promise<{
        data: {
            name: string;
            email: string;
            address: string;
            phone: string;
            userLevel: import(".prisma/client").$Enums.userLevel;
        };
        message: string;
    }>;
    profile2(req: any): Promise<{
        data: {
            name: string;
            email: string;
            address: string;
            phone: string;
            userLevel: import(".prisma/client").$Enums.userLevel;
        };
        message: string;
    }>;
}
