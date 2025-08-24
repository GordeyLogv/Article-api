import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { TYPES } from "./types.js";
import bodyParser from "body-parser";
import { ILoggerService } from "./common/logger/logger.service.interface.js";
import { IConfigService } from "./common/config/config.service.interface.js";


@injectable()
export class App {
    public app: Express;
    public server: Server;
    public PORT: number;
    public HOST: string;

    constructor(
        @inject(TYPES.LoggerService) private logger: ILoggerService,
        @inject(TYPES.ConfigService) private config: IConfigService 
    ) {
        this.app = express();
        this.PORT = this.config.port;
        this.HOST = this.config.host;

        this.useMiddleware();
        this.useRoutes();
    }

    public useMiddleware() {
        this.app.use(express.json());
        this.app.use(bodyParser.json());
    }

    public useRoutes() {}

    public init() {
        this.server = this.app.listen(this.PORT);
        this.logger.info(`Server was started on http://${this.HOST}:${this.PORT}`);
    }
}