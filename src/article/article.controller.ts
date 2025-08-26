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

    async getAllArticle(req: Request, res: Response, next: NextFunction) {
        try {
            const AllArticle = await this.articleService.getAllArticles();
            this.ok(res, AllArticle.map(a => a.toJson()));
        } catch (error) {
            next(error);
        }
    }

    async getArticle({ params }: Request<{ id: string }>, res: Response, next: NextFunction) {
        const articleId = Number(params.id);
        try {
            const findArticle = await this.articleService.getArticleById(articleId);
            
            if (!findArticle) {
                return this.fail(res, `Статья с таким id - ${articleId} не найдена`);
            }

            this.ok(res, findArticle.toJson());
        } catch (error) {
            next(error);    
        }
    }

    async addArticle({ body }: Request<{}, {}, ArticleCreateDto>, res: Response, next: NextFunction): Promise<void> {
        try {
            const newArticle = await this.articleService.createArticle(body);
            this.created(res, newArticle.toJson());
        } catch (error) {
            next(error);
        }
    }

    async updateArticle({ body, params }: Request<{ id: string }, {}, ArticleUpdateDto>, res: Response, next: NextFunction): Promise<void> {
        const articleId = Number(params.id);
        try {
            const updateArticle = await this.articleService.updateArticle(articleId, body);
            this.ok(res, updateArticle.toJson());
        } catch (error) {
            next(error);
        }
    }

    async deleteArticle({ params }: Request<{ id: string }>, res: Response, next: NextFunction) {
        const articleId = Number(params.id);
        try {
            await this.articleService.deleteArticle(articleId);
            this.ok(res, { message: `Статья с id - ${articleId} удалена` });
        } catch (error) {
            next(error);
        }
    }
}