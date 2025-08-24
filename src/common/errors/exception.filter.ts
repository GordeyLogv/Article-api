import { inject, injectable } from "inversify";
import { IExceptionFilter } from "./exception.filter.interface.js";
import { TYPES } from "../../types.js";
import { ILoggerService } from "../logger/logger.service.interface.js";
import { Request, Response, NextFunction } from "express";
import { HTTPError } from "./HTTPError.js";


injectable()
export class ExceptionFilter implements IExceptionFilter {
    constructor(
        @inject(TYPES.LoggerService) private logger: ILoggerService
    ) {
        this.logger.info(`[ExceptionFilter] - загружен`)
    }

    catch(err: unknown, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this.logger.error(`Ошибка ${err.statusCode} - ${err.message} : ${err.contex}`);
            res.status(err.statusCode);
            res.send({
                status: 'error',
                message: err.message,
                context: err.contex
            });
        } else if (err instanceof Error) {
            this.logger.error(`[ExceptionFilter] - ${err.message}`);
            res.status(500);
            res.send({
                status: 'error',
                message: err.message
            });
        } else {
            this.logger.error(`[ExceptionFilter] - Неизвестная ошибка`);
            res.status(500);
            res.send({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }
}