import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Request } from 'express';

export const XToken = createParamDecorator( 
    (data:unknown, ctx: ExecutionContext) => {
        const request : Request = ctx.switchToHttp().getRequest();
        return request.headers['x-token'];
    }
)
