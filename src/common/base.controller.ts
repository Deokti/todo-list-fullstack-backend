import { Router, Response } from "express";
import { inject, injectable } from "inversify";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import { IControllerRoutes, TExpressResponse } from "./route.interface";

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(@inject(INVERSIFY_TYPES.Logger) private logger: LoggerService) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	send<T>(res: Response, code: number, message: T): TExpressResponse {
		res.contentType("application/json");
		return res.status(code).json(message);
	}

	ok<T>(res: Response, message: T): TExpressResponse {
		return this.send(res, 200, message);
	}

	created(res: Response): TExpressResponse {
		return res.sendStatus(201);
	}

	protected bindRouter(routes: IControllerRoutes[]): void {
		for (const { func, method, path, middleware } of routes) {
			this.logger.logger.info(`[${method}] ${path}`);

			const middlewares = middleware?.map((m) => m.execute.bind(m));
			const thisFunk = func.bind(this);
			const pipeline = middlewares ? [...middlewares, thisFunk] : thisFunk;

			this.router[method](path, pipeline);
		}
	}
}
