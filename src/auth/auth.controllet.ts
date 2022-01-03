import { PrismaClient } from "@prisma/client";
import { NextFunction, Response, Request } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseController } from "../common/base.controller";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import { IAuthController } from "./auth.controller.interface";

@injectable()
export class AuthControllet extends BaseController implements IAuthController {
	client: PrismaClient;

	constructor(@inject(INVERSIFY_TYPES.Logger) private loggerService: LoggerService) {
		super(loggerService);
		this.client = new PrismaClient();

		this.bindRouter([
			{ path: "/login", method: "get", func: this.login },
			{ path: "/register", method: "post", func: this.register },
		]);
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, "Login");
	}

	async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, "Login");
	}
}
