import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "./middleware.interface.js";
import { HTTPError } from "../common/errors/HTTPError.js";
import { TYPES } from "../types.js";
import { IJwtService } from "../common/jwt/jwt.service.interface.js";
import { inject } from "inversify";

export class AuthMiddleware implements IMiddleware {
    constructor(
        @inject(TYPES.JwtService) private jwtService: IJwtService
    ) {}
    
    public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.headers.authorization) {
                return next(new HTTPError(401, 'Пройдите авторизацию', 'AuthMiddleware'));
            }

            const authHeader = req.headers.authorization;
    
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
    
            if (bearer !== 'Bearer' || !token) {
                return next(new HTTPError(401, 'Пройдите авторизацию', 'AuthMiddleware'));
            }
    
            const user = await this.jwtService.verifyJwt(token);
            req.user = user;
            next();
        } catch (error) {
            return next(new HTTPError(401, 'Пройдите авторизацию', 'AuthMiddleware'));
        }
            
    }
}