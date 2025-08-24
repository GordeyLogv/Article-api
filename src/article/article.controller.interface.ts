import { Request, Response, NextFunction } from "express";

export interface IArticleController {
    getAllArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}