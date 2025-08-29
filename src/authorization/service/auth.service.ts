import { inject, injectable } from "inversify";
import { IAuthService } from "./auth.service.interface.js";
import { TYPES } from "../../types.js";
import { User } from "../entity/user.entity.js";
import { IConfigService } from "../../common/config/config.service.interface.js";
import { UserModel } from "@prisma/client";
import { IAuthRepository } from "../repository/auth.repository.interface.js";
import { AuthLoginReqDto } from "../dto/request/auth-login-req.js";
import { AuthRegisterReqDto } from "../dto/request/auth-register-req.js";


injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(TYPES.AuthRepository) private authRepository: IAuthRepository,
        @inject(TYPES.ConfigService) private configService: IConfigService
    ) { }

    public async validateUser(dto: AuthLoginReqDto): Promise<UserModel | null> {
        const existedUser = await this.authRepository.find(dto.email);

        if (!existedUser) {
            return null;
        };

        const { email, name, age, password } = existedUser;

        const checkPassword = await new User(email, name, age, password).comparePassword(dto.password);

        if (!checkPassword) {
            return null;
        };

        return existedUser;
    }

    public async createUser({ email, password, name, age }: AuthRegisterReqDto): Promise<UserModel | null> {
        const existedUser = await this.authRepository.find(email);

        if (existedUser) {
            return null;
        };

        const newUser = new User(email, name, age);
        await newUser.setPassword(password, this.configService.salt);

        return await this.authRepository.create(newUser);
    }
}   