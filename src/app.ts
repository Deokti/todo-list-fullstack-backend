import express, { Express } from "express";
import { injectable, inject } from "inversify";
import { INVERSIFY_TYPES } from "./config/inversify.types";
import { IDotenvService } from "./dotenv/dotenv.service.interface";
import "reflect-metadata";
import { LoggerService } from "./logger/logger.service";
import { AuthControllet } from "./auth/auth.controllet";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "./database/prisma.service";

@injectable()
export class App {
	app: Express;
	port: string | number;

	constructor(
		@inject(INVERSIFY_TYPES.DotenvService) private dotenvService: IDotenvService,
		@inject(INVERSIFY_TYPES.Logger) private logger: LoggerService,
		@inject(INVERSIFY_TYPES.AuthControllet) private authControllet: AuthControllet,
		@inject(INVERSIFY_TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = this.dotenvService.get("PORT") || 8000;
	}

	useRoutes(): void {
		this.app.use("/auth", this.authControllet.router);
	}

	init(): void {
		this.useRoutes();
		this.prismaService.connect();
		this.app.listen(this.port);
		this.logger.logger.info(`Сервер запущен на http://localhost:${this.port}`);
	}
}
