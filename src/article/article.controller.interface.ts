import { Request, Response, NextFunction } from "express";
import { ArticleCreateDto } from "./dto/article-create.js";
import { ArticleUpdateDto } from "./dto/article-update.js";

export interface IArticleController {
    getAllArticles: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getArticle: (req: Request<{ id: string }>, res: Response, next: NextFunction) => Promise<void>;
    addArticle: (req: Request<{}, {}, ArticleCreateDto>, res: Response, next: NextFunction) => Promise<void>;
    updateArticle: (req: Request<{ id: string}, {}, ArticleUpdateDto>, res: Response, next: NextFunction) => Promise<void>;
    deleteArticle: (req: Request<{ id: string }>, res: Response, next: NextFunction) => Promise<void>;
}