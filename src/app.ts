import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { TYPES } from "./types.js";
import { ILoggerService } from "./common/logger/logger.service.interface.js";
import { IConfigService } from "./common/config/config.service.interface.js";
import { IExceptionFilter } from "./common/errors/exception.filter.interface.js";
import { ArticleController } from "./article/article.controller.js";
import { AuthController } from "./authorization/auth.controller.js";


@injectable()
export class App {
    public app: Express;
    public server: Server;
    public PORT: number;
    public HOST: string;

    constructor(
        @inject(TYPES.LoggerService) private logger: ILoggerService,
        @inject(TYPES.ConfigService) private config: IConfigService,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
        @inject(TYPES.AuthController) private authController: AuthController,
        @inject(TYPES.ArticleController) private articleController: ArticleController
    ) {
        this.app = express();
        this.PORT = this.config.port;
        this.HOST = this.config.host;

        this.useMiddleware();
        this.useRoutes();
        this.useExceptionFilter();
    }

    public useMiddleware() {
        this.app.use(express.json());
    }

    public useRoutes() {
        this.app.use('/api', this.authController.router);
        this.app.use('/api', this.articleController.router);
    }

    public useExceptionFilter() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public init() {
        this.server = this.app.listen(this.PORT);
        this.logger.info(`Server was started on http://${this.HOST}:${this.PORT}`);
    }
}