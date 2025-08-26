import { ClassConstructor, plainToClass } from "class-transformer";
import { IMiddleware } from "./middleware.interface.js";
import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { HTTPError } from "../common/errors/HTTPError.js";

export class ValidationMiddleware implements IMiddleware {
    constructor(
        private classToValidator: ClassConstructor<object>
    ) {}

    execute({ body }: Request, res: Response, next: NextFunction): void {
        const instance = plainToClass(this.classToValidator, body);

        validate(instance).then(errors => {
            errors.length > 0
                ? next(new HTTPError(422, 'Ошибка валидации данных', 'ValidationMiddleware'))
                : next()
        });
    }
}