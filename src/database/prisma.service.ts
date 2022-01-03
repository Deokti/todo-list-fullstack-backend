import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import "reflect-metadata";

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(INVERSIFY_TYPES.Logger) private logger: LoggerService) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			this.client.$connect();
			this.logger.logger.info(`Подключение к БД успешно`);
		} catch (error) {
			this.logger.logger.error(`При подключение к БД произошла ошибка`, error);
		}
	}

	async disconnect(): Promise<void> {
		try {
			this.client.$disconnect();
			this.logger.logger.info(`Отключение от БД успешно`);
		} catch (error) {
			this.logger.logger.error(`При отключении от БД произошла ошибка`, error);
		}
	}
}
