import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
constructor(private prisma:PrismaService){}

async getUsers(){
    let users =  await this.prisma.user.findFirst({
        select:{
            name : true,
            email: true
        }
    })

    return {
        data : users
    }
}

async create(data: CreateUserDto){
    return this.prisma.user.create({
        data:data
    })
}

async getById(id:number){
    let userById = await this.prisma.user.findMany({
        where : {
            id : id         
        },
        select : {
            name : true,
            email : true,
            password: false,
            phone: true,
        },
    })
    console.log(userById);
    
    return {
        data: userById
    };
}

}
