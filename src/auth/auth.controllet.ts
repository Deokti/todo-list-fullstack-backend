import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseController } from "../common/base.controller";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";

@injectable()
export class AuthControllet extends BaseController {
	client: PrismaClient;

	constructor(@inject(INVERSIFY_TYPES.Logger) private loggerService: LoggerService) {
		super(loggerService);
		this.client = new PrismaClient();

		this.bindRouter([
			{ path: "/login", method: "get", func: this.login },
			{ path: "/register", method: "post", func: this.register },
		]);
	}

	login(): void {
		console.log("Login");
	}

	register(): void {
		console.log("REGISTER");
	}
}
