import { UserModel } from "@prisma/client";
import { IJwtService } from "./jwt.service.interface.js";
import { JwtPayload } from "../../authorization/dto/jwt.dto.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import { IConfigService } from "../config/config.service.interface";
import jwt from "jsonwebtoken";

@injectable()
export class JwtService implements IJwtService {
    constructor(
        @inject(TYPES.ConfigService) private configService: IConfigService
    ) {}

    public async signJwt(data: UserModel, secret: string): Promise<string> {
        const payload = new JwtPayload({
            id: data.id,
            role: data.role,
            email: data.email,
            name: data.name,
            age: data.age
        }, this.configService.expiresInSecond);

        return new Promise((resolve, reject) => {
            jwt.sign(payload.getPayload(), secret, (err, token) => {
                if (err || !token) {
                    return reject(err);
                };
                return resolve(token);
            });
        });
    }

    public verifyJwt(token: string): Promise<JwtPayload> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.configService.secretJwt, (err, decoded) => {
                if (err || !decoded) {
                    return reject(err);
                }
                return resolve(decoded as JwtPayload);
            });
        });
    }
}