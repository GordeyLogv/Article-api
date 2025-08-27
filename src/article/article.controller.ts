import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";
import { IArticleController } from "./article.controller.interface.js";
import { TYPES } from "../types.js";
import { ILoggerService } from "../common/logger/logger.service.interface.js";
import { IExceptionFilter } from "../common/errors/exception.filter.interface.js";
import { IConfigService } from "../common/config/config.service.interface.js";
import { Request, Response, NextFunction } from "express";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { ArticleCreateDto } from "./dto/article-create.js";
import { ArticleUpdateDto } from "./dto/article-update.js";
import { IArticleService } from "./article.service.interface.js";
import { HTTPError } from "../common/errors/HTTPError.js";

@injectable()
export class ArticleController extends BaseController implements IArticleController {
    constructor(
        @inject(TYPES.LoggerService) logger: ILoggerService,
        @inject(TYPES.ExceptionFilter) private ExceptionFilter: IExceptionFilter,
        @inject(TYPES.ConfigService) private config: IConfigService,
        @inject(TYPES.ArticleService) private articleService: IArticleService
    ) {
        super(logger);

        this.bindRouters([
            {
                path: '/articles',
                method: 'get',
                func: this.getAllArticles,
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
                middleware: [new ValidationMiddleware(ArticleCreateDto)]
            },
            {
                path: '/article/:id',
                method: 'put',
                func: this.updateArticle,
                middleware: [new ValidationMiddleware(ArticleUpdateDto)]
            },
            {
                path: '/article/:id',
                method: 'delete',
                func: this.deleteArticle,
                middleware: []
            }
        ])
    }

    async getAllArticles(req: Request, res: Response, next: NextFunction): Promise<void> {
        const allArticles = await this.articleService.getAllArticles();
        
        this.ok(res, allArticles);
    }

    async getArticle({ params }: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
        const article = await this.articleService.getArticleById(Number(params.id));

        if (article === null) {
            throw new HTTPError(404, `Статья с id - ${params.id} не найдена`, 'getArticle');
        }

        this.ok(res, article);
    }

    async addArticle({ body }: Request<{}, {}, ArticleCreateDto>, res: Response, next: NextFunction): Promise<void> {
        const newArticle = await this.articleService.createArticle(body);

        if (newArticle === false) {
            throw new HTTPError(422, 'Проверьте введёные данные', 'addArticle');
        }
        this.created(res, `Статья создана`);
    }

    async updateArticle({ body, params }: Request<{ id: string }, {}, ArticleUpdateDto>, res: Response, next: NextFunction): Promise<void> {
        const updated = await this.articleService.updateArticle(Number(params.id), body);

        if (!updated) {
            throw new HTTPError(404, `Статья с id - ${params.id} не найдена`, 'updatedArticle');
        }
        this.created(res, 'Статья обновлена');
    }

    async deleteArticle({ params }: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
        const deleted = await this.articleService.deleteArticle(Number(params.id));

        if (!deleted) {
            throw new HTTPError(404, `Статья с id - ${params.id} не найдена`, 'deleteArticle');
        }
        this.created(res, 'Статья удалена');
    }
}