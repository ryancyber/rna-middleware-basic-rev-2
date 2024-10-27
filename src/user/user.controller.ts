import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { XToken } from 'src/decorators/x-token/x-token.decorator';
import { log } from 'console';

@Controller('user')
export class UserController {
constructor(private  userService:UserService){}

    @UseGuards(RolesGuard)
    @Roles('kasir', 'admin')
    @Post()
    createUser(@Body() body:CreateUserDto, @XToken() XToken){
        console.log(XToken);
        
       return this.userService.create(body);
    }

    // @UseGuards(AuthGuard)
    @Get()
    getUser(){
        return this.userService.getUsers();
    }

    @Get(':id')
    getById(@Param('id') id:number){
        
        return this.userService.getById(+id);
    }
}
