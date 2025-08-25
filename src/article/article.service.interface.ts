import { Article } from "./article.entity.js";

export interface IArticleService {
    createArticle: (article: Article) => Promise<Article>;
    getArticleById: (id: number) => Promise<Article | null>;
    getAllArticle: () => Promise<Article[]>;
    updateArticle: (id: number, article: Partial<Article>) => Promise<Article>;
    deleteArticle: (id: number) => Promise<void>;
}