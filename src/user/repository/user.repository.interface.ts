import { UserModel } from "@prisma/client";
import { User } from "../entity/user.entity.js";
import { UserUpdateDto } from "../dto/user-update.js";

export interface IUserRepository {
    findUserByEmail: (email: string) => Promise<UserModel | null>;
    findUserById: (id: number) => Promise<UserModel | null>;
    findAllUser: () => Promise<UserModel[]>
    createUser: (user: User) => Promise<UserModel>;
    updateUser: (email: string, dto: UserUpdateDto) => Promise<UserModel>;
    deleteUser: (email: string) => Promise<boolean>;
}