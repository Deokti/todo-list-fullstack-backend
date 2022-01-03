import { injectable } from "inversify";
import { Logger } from "tslog";
import "reflect-metadata";

@injectable()
export class LoggerService {
	logger: Logger;

	constructor() {
		this.logger = new Logger();
	}
}
