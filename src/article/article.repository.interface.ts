import { Article } from "./article.entity.js";
import { ArticleUpdateDto } from "./dto/article-update.js";
import { ArticleModel } from "@prisma/client";

export interface IArticleRepository {
    create: (article: Article) => Promise<boolean>;
    findById: (id: number) => Promise<ArticleModel | null>;
    findAll: () => Promise<ArticleModel[]>;
    update: (id: number, dto: ArticleUpdateDto) => Promise<boolean | null>;
    delete: (id: number) => Promise<boolean | null>;
    incrementViews: (id: number) => Promise<boolean | null>;
    incrementLikes: (id: number) => Promise<boolean | null>;
    descrementLikes: (id: number) => Promise<boolean | null>;
}