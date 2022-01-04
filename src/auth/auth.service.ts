// Данный класс содержит в себе бизнес-логику, такую как
// Проверить, нет ли такого пользователя, создать, если есть -кинуть оштбку

import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { IDotenvService } from "../dotenv/dotenv.service.interface";
import { IAuthRepository } from "./auth.repository.interface";
import { IAuthService } from "./auth.service.interface";
import { IUserAuthDto } from "./dto/user.auth.interface";
import { User } from "./user.entity";
import "reflect-metadata";

@injectable()
export class AuthService implements IAuthService {
	constructor(
		@inject(INVERSIFY_TYPES.AuthRepository) private authRepository: IAuthRepository,
		@inject(INVERSIFY_TYPES.DotenvService) private dotenvService: IDotenvService,
	) {}

	async createUser({ email, password }: IUserAuthDto): Promise<UserModel | null> {
		const isCreatedUser = await this.authRepository.find(email);
		if (isCreatedUser) return null;

		const user = new User(email);
		const salt = this.dotenvService.get("SALT");
		await user.setPassword(password, Number(salt));

		return this.authRepository.create(user);
	}

	async findUser({ email, password }: IUserAuthDto): Promise<boolean> {
		const isCreatedUser = await this.authRepository.find(email);
		if (!isCreatedUser) return false;

		const user = new User(isCreatedUser.email, isCreatedUser.password);
		return user.comparePassword(password);
	}
}
