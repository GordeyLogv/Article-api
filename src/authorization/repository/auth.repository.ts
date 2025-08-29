import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import { PrismaService } from "../../common/database/prisma.service.js";
import { UserModel } from "@prisma/client";
import { User } from "../entity/user.entity.js";
import { IAuthRepository } from "./auth.repository.interface.js";


injectable()
export class AuthRepository implements IAuthRepository {
    constructor(
        @inject(TYPES.PrismaService) private prismaService: PrismaService
    ) {}

    public async find(email: string): Promise<UserModel | null> {
        const existedUser = await this.prismaService.userModel.findUnique({
            where: { email },
        });

        return existedUser ? existedUser : null;
    }

    public async create(user: User): Promise<UserModel> {
        return await this.prismaService.userModel.create({
            data: {
                role: user.role,
                email: user.email,
                password: user.password,
                name: user.name,
                age: user.age,
                isBlocked: user.isBlocked,
                createdAt: user.createdAt
            },
        });
    }
}