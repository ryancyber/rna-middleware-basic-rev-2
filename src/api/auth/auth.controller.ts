import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { userLevel } from '@prisma/client';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    // @UsePipes(ValidationPipe)
    @Post('register')
    async register(@Body() body: AuthRegisterDto){
        return {
           data: await this.authService.register(body),
           message: "register user success"
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: AuthLoginDto){
        return {
           data: await this.authService.login(body),
           message: "login success"
        }
    }

    @Roles(userLevel.Admin, userLevel.Member)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    @Get('profile')
    async profile(@Request() req){
        console.log(req.user);
        
        return {
            data : await this.authService.profile(req.user.sub),
            message : "get profile success"
        };
    }

    @Roles(userLevel.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    @Get('profile2')
    async profile2(@Request() req){
        console.log(req.user);
        
        return {
            data : await this.authService.profile(req.user.sub),
            message : "get profile success"
        };
    }
}
