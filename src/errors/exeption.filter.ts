import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http-error";
import "reflect-metadata";

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(INVERSIFY_TYPES.Logger) private logger: LoggerService) {}

	catch(error: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (error instanceof HTTPError) {
			this.logger.logger.error(`[${error.context}] Ошибка ${error.statusCode}: ${error.message}`);
			res.status(error.statusCode).send({
				error: true,
				message: error.message,
				statusCode: error.statusCode,
			});
		} else {
			this.logger.logger.error(error.message);
			res.status(500).send({
				error: true,
				message: error.message,
			});
		}
	}
}
