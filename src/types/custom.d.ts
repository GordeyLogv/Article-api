import { JwtPayload } from "../authorization/dto/jwt.dto";

declare global {
    namespace Express {
        export interface Request {
            user?: JwtPayload;
        }   
    }
}