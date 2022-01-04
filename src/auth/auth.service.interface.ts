import { UserModel } from "@prisma/client";
import { IUserAuthDto } from "./dto/user.auth.interface";
import { User } from "./user.entity";

export interface IAuthService {
	createUser: (user: IUserAuthDto) => Promise<UserModel | null>;
}
