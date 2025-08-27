import { ArticleModel } from "@prisma/client";
import { ArticleCreateDto } from "./dto/article-create.js";
import { ArticleUpdateDto } from "./dto/article-update.js";

export interface IArticleService {
    createArticle: (dto: ArticleCreateDto) => Promise<boolean>;
    getArticleById: (id: number) => Promise<ArticleModel | null>;
    getAllArticles: () => Promise<ArticleModel[]>;
    updateArticle: (id: number, dto: ArticleUpdateDto) => Promise<boolean | null>;
    deleteArticle: (id: number) => Promise<boolean | null>;
    incrementViews: (id: number) => Promise<boolean | null>;
    incrementLikes: (id: number) => Promise<boolean | null>;
    descrementLikes: (id: number) => Promise<boolean | null>;
}