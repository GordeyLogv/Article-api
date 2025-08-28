import { UserModel } from "@prisma/client";
import { UserUpdateDto } from "../dto/user-update.js";
import { UserRegisterDto } from "../dto/user-register.js";


export class IUserService {
    findUserByEmail: (email: string) => Promise<UserModel | null>;
    findUserById: (id: number) => Promise<UserModel | null>;
    createUser: (dto: UserRegisterDto) => Promise<UserModel | boolean>;
    validateUser: (email: string, password: string) => Promise<boolean | null>;
    getAllUsers: () => Promise<UserModel[]>;
    updateUser: (email: string, dto: UserUpdateDto) => Promise<UserModel | null>;
    deleteUser: (email: string) => Promise<boolean | null>;
}