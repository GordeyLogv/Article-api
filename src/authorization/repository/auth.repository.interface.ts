import { UserModel } from "@prisma/client";
import { User } from "../entity/user.entity.js";

export interface IAuthRepository {
    find: (email: string) => Promise<UserModel | null>;
    create: (user: User) => Promise<UserModel>
}