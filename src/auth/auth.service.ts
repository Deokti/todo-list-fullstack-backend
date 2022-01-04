// Данный класс содержит в себе бизнес-логику, такую как
// Проверить, нет ли такого пользователя, создать, если есть -кинуть оштбку

import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { IAuthRepository } from "./auth.repository.interface";
import { IAuthService } from "./auth.service.interface";

@injectable()
export class AuthService implements IAuthService {
	constructor(@inject(INVERSIFY_TYPES.AuthRepository) private authRepository: IAuthRepository) {}

	async createUser(user: UserModel): Promise<UserModel | null> {
		const isCreatedUser = await this.authRepository.find(user.email);
		if (isCreatedUser) return null;

		return this.authRepository.create(user);
	}
}
