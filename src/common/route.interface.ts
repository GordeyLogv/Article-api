import { Request, Response, NextFunction, Router } from "express";
import { IMiddleware } from "./middleware.interface";

export interface IControllerRoute {
    path: string;
    method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete'>;
    func: (req: Request, res: Response, next: NextFunction) => void;
    middleware?: IMiddleware[];
}