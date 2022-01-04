import { UserModel } from "@prisma/client";

export interface IAuthService {
	createUser: (user: UserModel) => Promise<UserModel | null>;
}
