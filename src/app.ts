import express, { Express } from "express";
import { injectable, inject } from "inversify";
import { INVERSIFY_TYPES } from "./config/inversify.types";
import { IDotenvService } from "./dotenv/dotenv.service.interface";
import "reflect-metadata";
import { LoggerService } from "./logger/logger.service";
import { AuthControllet } from "./auth/auth.controller";
import { PrismaService } from "./database/prisma.service";
import { json } from "body-parser";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import cors from "cors";
import { TodoController } from "./todos/todo.controller";

@injectable()
export class App {
	app: Express;
	port: string | number;

	constructor(
		@inject(INVERSIFY_TYPES.DotenvService) private dotenvService: IDotenvService,
		@inject(INVERSIFY_TYPES.Logger) private logger: LoggerService,
		@inject(INVERSIFY_TYPES.AuthControllet) private authControllet: AuthControllet,
		@inject(INVERSIFY_TYPES.PrismaService) private prismaService: PrismaService,
		@inject(INVERSIFY_TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(INVERSIFY_TYPES.TodoController) private todoController: TodoController,
	) {
		this.app = express();
		this.port = this.dotenvService.get("PORT") || 8000;
	}

	useRoutes(): void {
		this.app.use("/auth", this.authControllet.router);
		this.app.use("/", this.todoController.router);
	}

	useJson(): void {
		this.app.use(json());
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	useCors(): void {
		this.app.use(
			cors({
				origin: "*",
				credentials: true,
				optionsSuccessStatus: 200,
			}),
		);
	}

	init(): void {
		this.useCors();
		this.useJson();
		this.useRoutes();
		this.useExeptionFilters();
		this.prismaService.connect();
		this.app.listen(this.port);
		this.logger.logger.info(`Сервер запущен на http://localhost:${this.port}`);
	}
}
