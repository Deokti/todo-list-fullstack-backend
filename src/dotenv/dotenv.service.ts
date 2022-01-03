import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { injectable } from "inversify";
import { IDotenvService } from "./dotenv.service.interface";
import "reflect-metadata";

@injectable()
export class DotenvService implements IDotenvService {
	private config: DotenvParseOutput;

	constructor() {
		const configDotenv: DotenvConfigOutput = config();
		if (configDotenv.error) console.log("Произошла ошибка");
		this.config = configDotenv.parsed as DotenvParseOutput;
	}

	get(key: string): string {
		return this.config[key];
	}
}
