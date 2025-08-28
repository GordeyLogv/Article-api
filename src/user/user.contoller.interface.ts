import { Request, Response, NextFunction } from "express";

export interface IUserController {
    register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    profile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    profileUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    profileDelete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUserById: (req: Request<{ id: string}>, res: Response, next: NextFunction) => Promise<void>;
}