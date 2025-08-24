import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";
import { IArticleController } from "./article.controller.interface.js";
import { TYPES } from "../types.js";
import { ILoggerService } from "../common/logger/logger.service.interface.js";
import { IExceptionFilter } from "../common/errors/exception.filter.interface.js";
import { IConfigService } from "../common/config/config.service.interface.js";


@injectable()
export class ArticleController extends BaseController implements IArticleController {
    constructor(
        @inject(TYPES.LoggerService) logger: ILoggerService,
        @inject(TYPES.ExceptionFilter) private ExceptionFilter: IExceptionFilter,
        @inject(TYPES.ConfigService) private config: IConfigService
    ) {
        super(logger);

        this.bindRouters([
            {
                path: '/articles',
                method: 'get',
                func: this.getAllArticle,
                middleware: []
            },
            {
                path: '/article/:id',
                method: 'get',
                func: this.getArticle,
                middleware: []
            },
            {
                path: '/article',
                method: 'post',
                func: this.addArticle,
                middleware: []
            },
            {
                path: '/article/:id',
                method: 'put',
                func: this.updateArticle,
                middleware: []
            },
            {
                path: '/article/:id',
                method: 'delete',
                func: this.deleteArticle,
                middleware: []
            }
        ])
    }

    async getAllArticle() {

    }

    async getArticle() {

    }

    async addArticle() {

    }

    async updateArticle() {

    }

    async deleteArticle() {

    }
}