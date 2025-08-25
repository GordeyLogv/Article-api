import { inject, injectable } from "inversify";
import { IArticleService } from "./article.service.interface.js";
import { TYPES } from "../types.js";
import { IArticleRepository } from "./article.repository.interface.js";
import { Article } from "./article.entity.js";
import { HTTPError } from "../common/errors/HTTPError.js";


injectable()
export class ArticleService implements IArticleService {
    constructor(
        @inject(TYPES.ArticleRepository) private articleRepository: IArticleRepository
    ) { }

    public async createArticle(article: Article): Promise<Article> {
        return this.articleRepository.create(article);
    }

    public async getArticleById(id: number): Promise<Article> {
        const article = await this.articleRepository.findById(id);

        if (!article) {
            throw new HTTPError(404, `Статья с id ${id} не найдена`, 'ArticleService');
        };

        return article;
    }

    public async getAllArticle(): Promise<Article[]> {
        return this.articleRepository.findAll();
    }

    public async updateArticle(id: number, article: Partial<Article>): Promise<Article> {
        const data = await this.articleRepository.findById(id);

        if (!data) {
            throw new HTTPError(404, `Статья с id ${id} не найдена`, 'ArticleService');
        };

        return this.articleRepository.update(id, article);
    }

    public async deleteArticle(id: number): Promise<void> {
        const data = await this.articleRepository.findById(id);

        if (!data) {
            throw new HTTPError(404, `Статья с id ${id} не найдена`, 'ArticleService');
        };

        await this.articleRepository.delete(id);
    }
}