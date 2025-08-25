import { Article } from "./article.entity.js";

export interface IArticleRepository {
    create: (article: Article) => Promise<Article>;
    findById: (id: number) => Promise<Article | null>;
    findAll: () => Promise<Article[]>;
    update: (id: number, article: Partial<Article>) => Promise<Article>;
    delete: (id: number) => Promise<void>;  
}