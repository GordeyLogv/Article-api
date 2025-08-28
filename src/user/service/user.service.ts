import { inject, injectable } from "inversify";
import { IUserService } from "./user.service.interface.js";
import { TYPES } from "../../types.js";
import { IUserRepository } from "../repository/user.repository.interface.js";
import { UserRegisterDto } from "../dto/user-register.js";
import { User } from "../entity/user.entity.js";
import { IConfigService } from "../../common/config/config.service.interface.js";
import { UserModel } from "@prisma/client";
import { UserUpdateDto } from "../dto/user-update.js";


injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: IUserRepository,
        @inject(TYPES.ConfigService) private configService: IConfigService
    ) { }

    public async findUserByEmail(email: string): Promise<UserModel | null> {
        const existedUser = await this.userRepository.findUserByEmail(email);

        return existedUser ? existedUser : null;
    }

    public async findUserById(id: number): Promise<UserModel | null> {
        const existedUser = await this.userRepository.findUserById(id);

        return existedUser ? existedUser : null;
    }

    public async createUser(dto: UserRegisterDto): Promise<UserModel | boolean> {
        const existedUser = await this.findUserByEmail(dto.email);

        if (existedUser) {
            return true;
        }
        
        const newUser = new User(dto);

        await newUser.setPassword(dto.password, this.configService.salt);

        return this.userRepository.createUser(newUser);
    }

    public async validateUser(email: string, password: string): Promise<boolean | null> {
        const existedUser = await this.findUserByEmail(email);

        if (!existedUser) {
            return null;
        };

        const user = new User(existedUser);
        
        return user.comparePassword(password);
    }

    public async getAllUsers(): Promise<UserModel[]> {
        const allUsers = await this.userRepository.findAllUser();

        return allUsers;
    }

    public async updateUser(email: string, dto: UserUpdateDto): Promise<UserModel | null> {
        const existedUser = await this.findUserByEmail(email);

        if (!existedUser) {
            return null;
        }

        const updateData: Partial<UserUpdateDto> = {};

        if (dto.email && dto.email.trim() !== '') {
            updateData.email = dto.email;
        };

        if (dto.name && dto.name.trim() !== '') {
            updateData.name = dto.name;
        }

        if (dto.password && dto.password.trim() !== '') {
            const tempUser = new User(existedUser);
            await tempUser.setPassword(dto.password, this.configService.salt);
            updateData.password = tempUser.password;
        }

        const updateUser = await this.userRepository.updateUser(email, updateData);

        return updateUser;
    }

    public async deleteUser(email: string): Promise<boolean | null> {
        const existedUser = await this.findUserByEmail(email);

        if (!existedUser) {
            return null;
        };

        await this.userRepository.deleteUser(email);

        return true;
    }
}   