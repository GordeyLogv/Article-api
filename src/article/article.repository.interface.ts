import { Article } from "./article.entity.js";
import { ArticleUpdateDto } from "./dto/article-update.js";

export interface IArticleRepository {
    create: (article: Article) => Promise<Article>;
    findById: (id: number) => Promise<Article | null>;
    findAll: () => Promise<Article[]>;
    update: (id: number, dto: ArticleUpdateDto) => Promise<Article>;
    delete: (id: number) => Promise<void>;
    incrementViews: (id: number) => Promise<Article>;
    incrementLikes: (id: number) => Promise<Article>
}