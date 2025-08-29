import { UserModel } from "@prisma/client";

export interface IProfileService {
    profile: (id: number) => Promise<UserModel>;
    profileUpdate: (id: number) => Promise<UserModel>;
    profileDelete: (id: number) => Promise<void>;
    logout: (id: number) => Promise<void>;
}