import { inject, injectable } from "inversify";
import { IArticleService } from "./article.service.interface.js";
import { TYPES } from "../types.js";
import { IArticleRepository } from "./article.repository.interface.js";
import { Article } from "./article.entity.js";
import { ArticleCreateDto } from "./dto/article-create.js";
import { ArticleUpdateDto } from "./dto/article-update.js";


@injectable()
export class ArticleService implements IArticleService {
    constructor(
        @inject(TYPES.ArticleRepository) private articleRepository: IArticleRepository
    ) {}

    public async createArticle(dto: ArticleCreateDto): Promise<Article> {
        const article = new Article({
            title: dto.title,
            content: dto.content,
            imageUrl: dto.imageUrl
        });
        
        return this.articleRepository.create(article);
    }

    public async getArticleById(id: number): Promise<Article | null> {
        return this.articleRepository.findById(id);
    }

    public async getAllArticles(): Promise<Article[]> {
        return this.articleRepository.findAll();
    }

    public async updateArticle(id: number, dto: ArticleUpdateDto): Promise<Article> {
        return this.articleRepository.update(id, dto);
    }

    public async deleteArticle(id: number): Promise<void> {
        await this.articleRepository.delete(id);
    }

    public async incrementViews(id: number): Promise<Article> {
        return this.articleRepository.incrementViews(id);
    }

    public async incrementLikes(id: number): Promise<Article> {
        return this.articleRepository.incrementLikes(id);
    }
}