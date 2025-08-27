import { inject, injectable } from "inversify";
import { IArticleRepository } from "./article.repository.interface.js";
import { TYPES } from "../types.js";
import { PrismaService } from "../common/database/prisma.service.js";
import { Article } from "./article.entity.js";
import { ArticleModel } from "@prisma/client";
import { ArticleUpdateDto } from "./dto/article-update.js";

@injectable()
export class ArticleRepository implements IArticleRepository {
    constructor(
        @inject(TYPES.PrismaService) private prismaService: PrismaService,
    ) { }

    public async create(article: Article): Promise<boolean> {
        await this.prismaService.articleModel.create({
            data: {
                title: article.title,
                content: article.content,
                imageUrl: article.imageUrl,
                views: article.views,
                likes: article.likes,
                createdAt: article.createdAt
            } 
        });
        return true;
    }

    public async findById(id: number): Promise<ArticleModel | null> {
        const findArticle = await this.prismaService.articleModel.findUnique({
            where: { id }
        });
        return findArticle ? findArticle : null;
    }

    public async findAll(): Promise<ArticleModel[]> {
        const findAll = await this.prismaService.articleModel.findMany();

        return findAll;
    }

    public async update(id: number, dto: ArticleUpdateDto): Promise<boolean | null> {
        const findArticle = await this.findById(id);
        
        if (!findArticle) {
            return null;
        }

        const newData = {
            ...(dto.title && { title: dto.title }),
            ...(dto.content && { content: dto.content }),
            ...(dto.imageUrl && { imageUrl: dto.imageUrl })
        };

        await this.prismaService.articleModel.update({
            where: { id },
            data: newData
        });

        return true;
    }

    public async delete(id: number): Promise<boolean | null> {
        const findArticle = await this.findById(id);

        if (!findArticle) {
            return null;
        };

        await this.prismaService.articleModel.delete({
            where: { id }
        });

        return true;
    }

    public async incrementViews(id: number): Promise<boolean | null> {
        const findArticle = await this.findById(id);

        if (!findArticle) {
            return null;
        };

        await this.prismaService.articleModel.update({
            where: { id },
            data: { views: { increment: 1 }}
        });

        return true;
    }

    public async incrementLikes(id: number): Promise<boolean | null> {
        const findArticle = await this.findById(id);

        if (!findArticle) {
            return null;
        };

        await this.prismaService.articleModel.update({
            where: { id },
            data: { likes: { increment: 1 }}
        }); 

        return true;
    }

    public async descrementLikes(id: number): Promise<boolean | null> {
        const findArticle = await this.findById(id);

        if (!findArticle) {
            return null;
        };

        await this.prismaService.articleModel.update({
            where: { id },
            data: { likes: { decrement: 1 }}
        });

        return true
    }
}