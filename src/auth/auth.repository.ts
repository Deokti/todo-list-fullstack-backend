import { IAuthRepository } from "./auth.repository.interface";
import { inject, injectable } from "inversify";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { PrismaService } from "../database/prisma.service";
import { UserModel } from "@prisma/client";
import { User } from "./user.entity";
import "reflect-metadata";

// Данный класс отвечает лишь за работу с Базой данных,
// реализуя, например, базовый набор методов CRUD для авторизации

@injectable()
export class AuthRepository implements IAuthRepository {
	constructor(@inject(INVERSIFY_TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, password }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
			},
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
