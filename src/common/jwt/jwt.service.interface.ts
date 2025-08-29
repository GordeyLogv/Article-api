import { UserModel } from "@prisma/client";
import { JwtPayload } from "../../authorization/dto/jwt.dto";


export interface IJwtService {
    signJwt: (data: UserModel, secret: string) => Promise<string>; 
    verifyJwt: (token: string) => Promise<JwtPayload>
}