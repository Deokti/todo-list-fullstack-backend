import { NextFunction, Response, Request } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { ValidateMiddleware } from "../common/validate.middleware";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import { IAuthController } from "./auth.controller.interface";
import { IAuthService } from "./auth.service.interface";
import { IUserAuthDto } from "./dto/user.auth.interface";
import "reflect-metadata";

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
			{
				path: "/login",
				method: "get",
				func: this.login,
				middleware: [new ValidateMiddleware(IUserAuthDto)],
			},
			{
				path: "/register",
				method: "post",
				func: this.register,
				middleware: [new ValidateMiddleware(IUserAuthDto)],
			},
		]);
	}

	async login({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.authService.findUser(body);
		if (!result) {
			this.send(res, 422, "Не правильный Email или пароль");
			return;
		}
		this.ok(res, body);
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
