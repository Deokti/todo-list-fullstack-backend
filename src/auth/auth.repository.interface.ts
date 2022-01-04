import { UserModel } from "@prisma/client";

export interface IAuthRepository {
	create: (user: UserModel) => Promise<UserModel>;
}