import { NextFunction, Response, Request } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseController } from "../common/base.controller";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import { IAuthController } from "./auth.controller.interface";
import { IAuthService } from "./auth.service.interface";

// Данный класс отвечает за ответ на поступающие дейсвтия.
// Например, при создании пользователя всё что он делает, это активирует функции

@injectable()
export class AuthControllet extends BaseController implements IAuthController {
	constructor(
		@inject(INVERSIFY_TYPES.Logger) private loggerService: LoggerService,
		@inject(INVERSIFY_TYPES.AuthService) private authService: IAuthService,
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

	async register({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.authService.createUser(body);

		if (!result) {
			this.send(res, 422, "Пользовать с таким Email уже существует");
			return;
		}

		this.ok(res, result);
	}
}
