import { UserModel } from "@prisma/client";
import { AuthLoginReqDto } from "../dto/request/auth-login-req.js";
import { AuthRegisterReqDto } from "../dto/request/auth-register-req.js";

export class IAuthService {
    validateUser: (dto: AuthLoginReqDto) => Promise<UserModel | null>;
    createUser: (dto: AuthRegisterReqDto) => Promise<UserModel | null>;
}