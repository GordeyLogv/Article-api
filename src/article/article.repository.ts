import { inject, injectable } from "inversify";
import { IArticleRepository } from "./article.repository.interface.js";
import { TYPES } from "../types.js";
import { Article } from "./article.entity.js";
import { PrismaService } from "../common/database/prisma.service.js";
import { ArticleUpdateDto } from "./dto/article-update.js";

@injectable()
export class ArticleRepository implements IArticleRepository {
    constructor(
        @inject(TYPES.PrismaService) private prismaService: PrismaService
    ) { }

    public async create(article: Article): Promise<Article> {
        const created = await this.prismaService.articleModel.create({
            data: {
                title: article.title,
                content: article.content,
                imageUrl: article.imageUrl,
                views: article.views,
                likes: article.likes,
                createdAt: article.createdAt
            },
        });

        return Article.restore(created);
    }

    public async findById(id: number): Promise<Article | null> {
        const findArticle = await this.prismaService.articleModel.findUnique({
            where: { id }
        });

        if (!findArticle) {
            return null;
        };

        return Article.restore(findArticle);
    }

    public async findAll(): Promise<Article[]> {
        const findAllArticle = await this.prismaService.articleModel.findMany();

        return findAllArticle.map((a) => Article.restore(a));
    }

    public async update(id: number, dto: ArticleUpdateDto): Promise<Article> {
        const data = await this.prismaService.articleModel.update({
            where: { id },
            data: {
            ...(dto.title && { title: dto.title }),
            ...(dto.content && { content: dto.content }),
            ...(dto.imageUrl && { imageUrl: dto.imageUrl }),
            }
        });

        return Article.restore(data);
    }

    public async delete(id: number): Promise<void> {
        await this.prismaService.articleModel.delete({
            where: { id }
        });
    }

    public async incrementViews(id: number): Promise<Article> {
        const updateViews = await this.prismaService.articleModel.update({
            where: { id },
            data: { views: { increment: 1 } }
        });

        return Article.restore(updateViews);
    }

    public async incrementLikes(id: number): Promise<Article> {
        const updateLikes = await this.prismaService.articleModel.update({
            where: { id },
            data: { likes: { increment: 1 } }
        });

        return Article.restore(updateLikes);
    }
}