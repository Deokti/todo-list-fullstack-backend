import { Router } from "express";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class AuthControllet {
	router: Router;

	constructor() {
		this.router = Router();
		this.router.get("/login", this.login);
		this.router.get("/register", this.login);
	}

	login(): void {
		console.log("LOGIN");
	}

	register(): void {
		console.log("REGISTER");
	}
}
