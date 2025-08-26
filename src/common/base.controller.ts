import { Router, Response } from "express";
import { ILoggerService } from "./logger/logger.service.interface";
import { IControllerRoute } from "./route.interface";


export abstract class BaseController {
    protected logger: ILoggerService;
    private readonly _router: Router;

    constructor(logger: ILoggerService) {
        this._router = Router();
        this.logger = logger;
    }

    public get router() {
        return this._router;
    }

    protected bindRouters(routes: IControllerRoute[]) {
        for (const route of routes) {
            this.logger.info(`${route.method.toUpperCase()} - ${route.path}`);

            const middleware = route.middleware?.map(m => m.execute.bind(m));
            const handler = route.func.bind(this);

            const pipeline = middleware ? [...middleware, handler] : handler;

            this.router[route.method](route.path, pipeline);
        }
    }

    protected ok<T>(res: Response, data: T): void {
        res.status(200);
        res.json(data);
    }

    protected created<T>(res: Response, data: T): void {
        res.status(201);
        res.json(data);
    }

    protected fail(res: Response, message: string): void {
        res.status(400);
        res.json({ status: 'error', message });
    }
}