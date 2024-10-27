import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { userLevel } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prismaService:PrismaService,
        private jwtService:JwtService
    ){}

    async register(data: AuthRegisterDto){
        data.password = await bcrypt.hash(data.password, 10);
        const user = await this.prismaService.user.findFirst({
            where: {
                email : data.email
            }
        });

        console.log(user);
        
        if(user){
            throw new ConflictException('email already exists');
        }
        
        const createUser = await this.prismaService.user.create({
            data: data
        })

        delete createUser.password; //utk tdk menampilkan response password di api        
        return createUser;

    }

    async login(data: AuthLoginDto){
        const user = await this.prismaService.user.findFirst({
            where: {
                email : data.email
            }
        });
        
        if(!user){
            throw new UnauthorizedException('email not exists');
        }

        const checkPassword = await bcrypt.compare(data.password, user.password);

        if (!checkPassword) {
            throw new UnauthorizedException('invalid credentials');
        }

        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            userLevel: user.userLevel
        }
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken };

    }

    async profile(user_id: number){
        const user = await this.prismaService.user.findFirst({
            where: {
                id : user_id
            },
            select: {
                name : true,
                email: true,
                phone: true, 
                address: true,
                userLevel : true
            }
        });
        
        if(!user){
            throw new NotFoundException('User not exists');
        }

        return user;

    }
}

