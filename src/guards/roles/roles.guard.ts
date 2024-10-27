import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles',context.getHandler())
    const request: Request = context.switchToHttp().getRequest();
    // const role = request.headers.role; 
    // return roles.some((r)=>r==role);
    
    return roles.some((r)=>r==request['user'].userLevel);
  }
}
