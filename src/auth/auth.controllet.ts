import { Router } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseController } from "../common/base.controller";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";

@injectable()
export class AuthControllet extends BaseController {
	constructor(@inject(INVERSIFY_TYPES.Logger) private loggerService: LoggerService) {
		super(loggerService);

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
