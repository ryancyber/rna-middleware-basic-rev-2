"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async register(data) {
        data.password = await bcrypt.hash(data.password, 10);
        const user = await this.prismaService.user.findFirst({
            where: {
                email: data.email
            }
        });
        console.log(user);
        if (user) {
            throw new common_1.ConflictException('email already exists');
        }
        const createUser = await this.prismaService.user.create({
            data: data
        });
        delete createUser.password;
        return createUser;
    }
    async login(data) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email: data.email
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('email not exists');
        }
        const checkPassword = await bcrypt.compare(data.password, user.password);
        if (!checkPassword) {
            throw new common_1.UnauthorizedException('invalid credentials');
        }
        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            userLevel: user.userLevel
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken };
    }
    async profile(user_id) {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                name: true,
                email: true,
                phone: true,
                address: true,
                userLevel: true
            }
        });
        if (!user) {
            throw new common_1.NotFoundException('User not exists');
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map