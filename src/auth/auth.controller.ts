import { PrismaClient, UserModel } from "@prisma/client";
import { NextFunction, Response, Request } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseController } from "../common/base.controller";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { PrismaService } from "../database/prisma.service";
import { LoggerService } from "../logger/logger.service";
import { IAuthController } from "./auth.controller.interface";

@injectable()
export class AuthControllet extends BaseController implements IAuthController {
	constructor(
		@inject(INVERSIFY_TYPES.Logger) private loggerService: LoggerService,
		@inject(INVERSIFY_TYPES.PrismaService) private prismaService: PrismaService,
	) {
		super(loggerService);

		this.bindRouter([
			{ path: "/login", method: "get", func: this.login },
			{ path: "/register", method: "post", func: this.register },
		]);
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, "Login");
	}

	async create({ email, password }: UserModel): Promise<any> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
			},
		});
	}

	async register({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const item = await this.create(body);
		this.ok(res, item);
	}
}
