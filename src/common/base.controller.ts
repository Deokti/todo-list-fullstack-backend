import { Router } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import { IControllerRoutes } from "./route.interface";

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(@inject(TYPES.Logger) private logger: LoggerService) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
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
