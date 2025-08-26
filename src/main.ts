import "reflect-metadata";
import { Container } from "inversify"
import { TYPES } from "./types.js";
import { App } from "./app.js";
import { ILoggerService } from "./common/logger/logger.service.interface.js";
import { LoggerService } from "./common/logger/logger.service.js";
import { IConfigService } from "./common/config/config.service.interface.js";
import { ConfigService } from "./common/config/config.service.js";
import { IExceptionFilter } from "./common/errors/exception.filter.interface.js";
import { ExceptionFilter } from "./common/errors/exception.filter.js";
import { PrismaService } from "./common/database/prisma.service.js";
import { IArticleRepository } from "./article/article.repository.interface.js";
import { ArticleRepository } from "./article/article.repository.js";
import { IArticleService } from "./article/article.service.interface.js";
import { IArticleController } from "./article/article.controller.interface.js";
import { ArticleController } from "./article/article.controller.js";
import { ArticleService } from "./article/article.service.js";


const bootstrap = () => {
    const appContainer = new Container();

    appContainer.bind<App>(TYPES.Application).to(App);
    appContainer.bind<ILoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
    appContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
    appContainer.bind<PrismaService>(TYPES.PrismaService).to(PrismaService);
    appContainer.bind<IArticleRepository>(TYPES.ArticleRepository).to(ArticleRepository);
    appContainer.bind<IArticleService>(TYPES.ArticleService).to(ArticleService);
    appContainer.bind<IArticleController>(TYPES.ArticleController).to(ArticleController);

    const app = appContainer.get<App>(TYPES.Application);

    app.init();

    return { appContainer, app };
}

export const { app, appContainer } = bootstrap();

