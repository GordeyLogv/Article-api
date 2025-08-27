import { inject, injectable } from "inversify";
import { IArticleService } from "./article.service.interface.js";
import { TYPES } from "../types.js";
import { IArticleRepository } from "./article.repository.interface.js";
import { ArticleCreateDto } from "./dto/article-create.js";
import { Article } from "./article.entity.js";
import { ArticleModel } from "@prisma/client";
import { ArticleUpdateDto } from "./dto/article-update.js";

@injectable()
export class ArticleService implements IArticleService {
    constructor(
        @inject(TYPES.ArticleRepository) private articleRepository: IArticleRepository
    ) { }

    public async createArticle(dto: ArticleCreateDto): Promise<boolean> {
        const isCreated = await this.articleRepository.create(new Article(dto));

        return isCreated ? true : false;
    }

    public async getArticleById(id: number): Promise<ArticleModel | null> {
        const findArticle = await this.articleRepository.findById(id);

        return findArticle ? findArticle : null;
    }

    public async getAllArticles(): Promise<ArticleModel[]> {
        const allArticles = await this.articleRepository.findAll();

        return allArticles;
    }

    public async updateArticle(id: number, dto: ArticleUpdateDto): Promise<boolean | null> {
        const isUpdate = await this.articleRepository.update(id, dto);

        return isUpdate ? true : null;
    }

    public async deleteArticle(id: number): Promise<boolean | null> {
        const isDelete = await this.articleRepository.delete(id);

        return isDelete === true ? true : null;
    }

    public async incrementViews(id: number): Promise<boolean | null> {
        const isIncrement = await this.articleRepository.incrementViews(id);

        return isIncrement ? true : null
    }

    public async incrementLikes(id: number): Promise<boolean | null> {
        const isLiked = await this.articleRepository.incrementLikes(id);

        return isLiked ? true : null;
    }

    public async descrementLikes(id: number): Promise<boolean | null> {
        const isUnLiked = await this.articleRepository.descrementLikes(id);

        return isUnLiked ? true : null;
    }
}