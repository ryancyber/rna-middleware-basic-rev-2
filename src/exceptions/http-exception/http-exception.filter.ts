import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const { message }: any = exception.getResponse();

        response.status(status).json({
            statusCode: status,
            timestamp : new Date().toISOString(),
            path : request.url,
            message : message ?? exception.message
        });
    }
}