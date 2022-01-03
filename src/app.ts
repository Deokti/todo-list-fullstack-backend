import express, { Express } from "express";
import { injectable, inject } from "inversify";
import { INVERSIFY_TYPES } from "./config/inversify.types";
import { IDotenvService } from "./dotenv/dotenv.service.interface";
import "reflect-metadata";
import { LoggerService } from "./logger/logger.service";
import { AuthControllet } from "./auth/auth.controllet";
import { PrismaClient } from "@prisma/client";

@injectable()
export class App {
	app: Express;
	port: string | number;
	client: PrismaClient;

	constructor(
		@inject(INVERSIFY_TYPES.DotenvService) private dotenvService: IDotenvService,
		@inject(INVERSIFY_TYPES.Logger) private logger: LoggerService,
		@inject(INVERSIFY_TYPES.AuthControllet) private authControllet: AuthControllet,
	) {
		this.app = express();
		this.client = new PrismaClient();
		this.port = this.dotenvService.get("PORT") || 8000;
	}

	useRoutes(): void {
		this.app.use("/auth", this.authControllet.router);
	}

	async connect(): Promise<void> {
		try {
			this.client.$connect();
			this.logger.logger.info(`Подключение к БД успешно`);
		} catch (error) {
			this.logger.logger.error(`При подключение к БД произошла ошибка`, error);
		}
	}

	init(): void {
		this.useRoutes();
		this.connect();
		this.app.listen(this.port);
		this.logger.logger.info(`Сервер запущен на http://localhost:${this.port}`);
	}
}
