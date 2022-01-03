import express, { Express } from "express";
import { Logger } from "tslog";
import { injectable, inject } from "inversify";
import { TYPES } from "./config/inversify.types";
import { IDotenvService } from "./dotenv/dotenv.service.interface";
import "reflect-metadata";
import { LoggerService } from "./logger/logger.service";
import { BaseController } from "./common/base.controller";

@injectable()
export class App {
	app: Express;
	port: string | number;

	constructor(
		@inject(TYPES.DotenvService) private dotenvService: IDotenvService,
		@inject(TYPES.Logger) private logger: LoggerService,
	) {
		this.app = express();
		this.port = this.dotenvService.get("PORT") || 8000;
	}
	get router(): express.Router {
		throw new Error("Method not implemented.");
	}

	init(): void {
		this.app.listen(this.port);
		this.logger.logger.info(`Сервер запущен на http://localhost:${this.port}`);
	}
}
