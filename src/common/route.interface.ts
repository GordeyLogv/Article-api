import { Request, Response, NextFunction, Router } from "express";
import { IMiddleware } from "./middleware.interface";

export interface IControllerRoute<Params = any, Body = any, Query = any> {
    path: string;
    method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete'>;
    func: (req: Request<Params, unknown, Body, Query>, res: Response, next: NextFunction) => void;
    middleware?: IMiddleware[];
}