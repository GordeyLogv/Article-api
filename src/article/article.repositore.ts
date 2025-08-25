import { inject, injectable } from "inversify";
import { IArticleRepository } from "./article.repository.interface.js";
import { TYPES } from "../types.js";
import { Article } from "./article.entity.js";
import { PrismaService } from "../common/database/prisma.service.js";

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

        return new Article({
            title: created.title,
            content: created.content,
            imageUrl: created.imageUrl
        });
    }

    public async findById(id: number): Promise<Article | null> {
        const data = await this.prismaService.articleModel.findUnique({
            where: { id }
        });

        if (!data) {
            return null;
        };

        return new Article({
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl
        });
    }

    public async findAll(): Promise<Article[]> {
        const data = await this.prismaService.articleModel.findMany();

        return data.map(i => new Article({
            title: i.title,
            content: i.content,
            imageUrl: i.imageUrl
        }));
    }

    public async update(id: number, article: Partial<Article>): Promise<Article> {
        const data = await this.prismaService.articleModel.update({
            where: { id },
            data: {
                title: article.title,
                content: article.content,
                imageUrl: article.imageUrl
            }
        });

        return new Article({
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl
        });
    }

    public async delete(id: number) {
        await this.prismaService.articleModel.delete({
            where: { id }
        });
    }
}