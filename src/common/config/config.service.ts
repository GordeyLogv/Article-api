import "reflect-metadata";
import { injectable, inject } from "inversify";
import { IConfigService } from "./config.service.interface.js";
import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv"
import { TYPES } from "../../types.js";
import { ILoggerService } from "../logger/logger.service.interface.js";
import { HTTPError } from "../errors/HTTPError.js";

@injectable()
export class ConfigService implements IConfigService {
    private config: DotenvParseOutput;

    constructor(
        @inject(TYPES.LoggerService) private logger: ILoggerService
    ) {
        const result: DotenvConfigOutput = config();

        if (result.error) {
            this.logger.error(`[ConfigService] - .env не удалось загрузить`);
            throw new HTTPError(500, 'Ошибка загрузки .env', 'ConfigService')
        };
        
        this.logger.info(`[ConfigService] - .env загружен`);
        this.config = result.parsed as DotenvParseOutput;
    }

    get(key: string): string {

        const value = this.config[key];

        if (!value) {
            this.logger.error(`[ConfigService] - переменная ${key} не найдена`);
            throw new HTTPError(500, `.env - переменная ${key} не найдена`, 'ConfigService');
        } 

        return value;
    }

    get port(): number {
        const port =  Number(this.get('PORT'));

        if (isNaN(port)) {
            this.logger.error(`[ConfigService] - PORT не число : ${port}`);
            throw new HTTPError(500, `PORT не число : ${port}`, 'ConfigService');
        };

        return port;
    }

    get host(): string {
        return this.get('HOST');
    }

    get salt(): number {
        const SALT = Number(this.get('SALT'));

        if (isNaN(SALT)) {
            this.logger.error(`[ConfigService] - SALT не число : ${SALT}`);
            throw new HTTPError(500, `SALT не число : ${SALT}`, 'ConfigService');
        };

        return SALT;
    }

    get secretJwt(): string {
        return this.get('SECRET_ACCESS_TOKEN');
    }

    get expiresInSecond(): number {
        const expires = Number(this.get('EXPIRESINSECOND'));

        if (isNaN(expires)) {
            this.logger.error(`[ConfigService] - Expires не число : ${expires}`);
            throw new HTTPError(500, `Expires не число : ${expires}`, 'ConfigService');
        };
        return expires;
    }
}