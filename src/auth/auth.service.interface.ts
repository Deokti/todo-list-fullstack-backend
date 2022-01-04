import { UserModel } from "@prisma/client";
import { IUserAuthDto } from "./dto/user.auth.interface";

export interface IAuthService {
	createUser: (user: IUserAuthDto) => Promise<UserModel | null>;
	findUser: (user: IUserAuthDto) => Promise<boolean>;
}
