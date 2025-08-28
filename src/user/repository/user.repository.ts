import { inject, injectable } from "inversify";
import { IUserRepository } from "./user.repository.interface.js";
import { TYPES } from "../../types.js";
import { PrismaService } from "../../common/database/prisma.service.js";
import { User } from "../entity/user.entity.js";
import { UserModel } from "@prisma/client";
import { UserUpdateDto } from "../dto/user-update.js";

injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @inject(TYPES.PrismaService) private prismaService: PrismaService
    ) {}

    public async findUserByEmail(email: string): Promise<UserModel | null> {
        const findUser = await this.prismaService.userModel.findUnique({
            where: { email }
        });
        return findUser ? findUser : null;
    }

    public async findUserById(id: number): Promise<UserModel | null> {
        const findUser = await this.prismaService.userModel.findUnique({
            where: { id }
        });
        return findUser ? findUser : null;
    }

    public async findAllUser(): Promise<UserModel[]> {
        return await this.prismaService.userModel.findMany();
    }

    public async createUser(user: User): Promise<UserModel> {
        const newUser = await this.prismaService.userModel.create({
            data: {
                role: user.role,
                email: user.email,
                password: user.password,
                name: user.name,
                age: user.age,
                isBloced: user.isBloced,
                createdAt: user.createdAt
            }
        })
        return newUser;
    }

    public async updateUser(email: string, data: UserUpdateDto): Promise<UserModel> {
        const updated = await this.prismaService.userModel.update({
            where: { email },
            data: {
                email: data.email,
                name: data.name,
                password: data.password
            }
        });
        return updated;
    }

    public async deleteUser(email: string): Promise<boolean> {
        await this.prismaService.userModel.delete({
            where: { email } 
        });
        return true;
    }
}