import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";
import { IAuthController } from "./auth.contoller.interface.js";
import { TYPES } from "../types.js";
import { ILoggerService } from "../common/logger/logger.service.interface.js";
import { IAuthService } from "./service/auth.service.interface.js";
import { Request, Response, NextFunction } from "express";
import { AuthRegisterReqDto } from "./dto/request/auth-register-req.js";
import { AuthLoginReqDto } from "./dto/request/auth-login-req.js";
import { AuthRegisterResDto } from "./dto/response/auth-register.res.js";
import { AuthLoginResDto } from "./dto/response/auth-login-res.js";
import { IConfigService } from "../common/config/config.service.interface.js";
import { IJwtService } from "../common/jwt/jwt.service.interface.js";

@injectable()
export class AuthController extends BaseController implements IAuthController {
    constructor(
        @inject(TYPES.LoggerService) logger: ILoggerService,
        @inject(TYPES.AuthService) private authService: IAuthService,
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.JwtService) private jwtService: IJwtService
    ) {
        super(logger);

        this.bindRouters([
            { 
                path: '/register', 
                method: 'post', 
                func: this.register, 
                middleware: [] 
            },
            { 
                path: '/login', 
                method: 'post', 
                func: this.login, 
                middleware: [] 
            }
        ]);
    }

    public async register({ body }: Request<{}, {}, AuthRegisterReqDto>, res: Response, next: NextFunction): Promise<void> {
        const newUser = await this.authService.createUser(body);

        if (!newUser) {
            return this.fail(res, `Пользователь с email ${body.email} - уже зарегистрирован`);
        }
        
        const answer = new AuthRegisterResDto({
            email: newUser.email,
            name: newUser.name
        })

        this.created(res, answer);
    }

    public async login({ body }: Request<{}, {}, AuthLoginReqDto>, res: Response, next: NextFunction): Promise<void> {
        const existedUser = await this.authService.validateUser(body);

        if (!existedUser) {
            return this.fail(res, 'Не правильный email или пароль');
        }

        const token = await this.jwtService.signJwt(existedUser, this.configService.secretJwt);

        const answer = new AuthLoginResDto({
            email: body.email,
            token
        });
        
        this.ok(res, `Вход выполнен успешно ${answer.email}, токен ${answer.token}`);
    }
}