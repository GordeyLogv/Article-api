import { Article } from "./article.entity.js";
import { ArticleCreateDto } from "./dto/article-create.js";
import { ArticleUpdateDto } from "./dto/article-update.js";

export interface IArticleService {
    createArticle: (dto: ArticleCreateDto) => Promise<Article>;
    getArticleById: (id: number) => Promise<Article | null>;
    getAllArticles: () => Promise<Article[]>;
    updateArticle: (id: number, dto: ArticleUpdateDto) => Promise<Article>;
    deleteArticle: (id: number) => Promise<void>;
    incrementViews: (id: number) => Promise<Article>;
    incrementLikes: (id: number) => Promise<Article>;
}