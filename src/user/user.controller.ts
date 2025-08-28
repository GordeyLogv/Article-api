import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";
import { IUserController } from "./user.contoller.interface.js";
import { TYPES } from "../types.js";
import { ILoggerService } from "../common/logger/logger.service.interface.js";
import { IUserService } from "./service/user.service.interface.js";
import { Request, Response, NextFunction } from "express";
import { UserRegisterDto } from "./dto/user-register.js";
import { UserLoginDto } from "./dto/user-login.js";


@injectable()
export class UserController extends BaseController implements IUserController {
    constructor(
        @inject(TYPES.LoggerService) logger: ILoggerService,
        @inject(TYPES.UserService) private userService: IUserService
    ) {
        super(logger);

        this.bindRouters([
            { path: '/auth/register', method: 'post', func: this.register, middleware: [] },

            { path: '/auth/login', method: 'post', func: this.login, middleware: [] },

            { path: '/profile', method: 'get', func: this.profile, middleware: [] },

            { path: '/profile', method: 'delete', func: this.profileDelete, middleware: [] },

            { path: '/profile', method: 'put', func: this.profileUpdate, middleware: [] },

            { path: '/users', method: 'get', func: this.getAllUsers, middleware: [] },

            { path: '/user/:id', method: 'get', func: this.getUserById, middleware: [] }
        ])
    }

    public async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
        const newUser = await this.userService.createUser(body);

        if (newUser === true) {
            this.fail(res, `Пользователь с email ${body.email} - уже зарегистрирован`);
        };

        this.created(res, 'Регистрация прошла успешна');
    }

    public async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
        const existedUser = await this.userService.validateUser(body.email, body.password);

        if (existedUser === null) {
            this.fail(res, `Пользователь с email ${body.email} - не найден`);
        };

        if (existedUser === false) {
            this.fail(res, `Не правильный пароль ${body.password}`);
        }

        this.ok(res, 'Вход выполнен успешно');
    }

    public async profile(req: Request, res: Response, next: NextFunction): Promise<void> {

    }

    public async profileUpdate({ body }: Request, res: Response, next: NextFunction): Promise<void> {

    }

    public async profileDelete({ body }: Request, res: Response, next: NextFunction): Promise<void> {

    }

    public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const allUsers = await this.userService.getAllUsers();

        this.ok(res, allUsers);
    }

    public async getUserById({ params }: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
        const existedUser = await this.userService.findUserById(Number(params.id));

        if (!existedUser) {
            this.fail(res, `Пользователь с id ${params.id} не найден`);
        }

        this.ok(res, existedUser);
    }
}