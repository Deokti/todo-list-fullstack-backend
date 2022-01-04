import { IsEmail, IsString } from "class-validator";

export class IUserAuthDto {
	@IsEmail({}, { message: "Неправильный Email" })
	email: string;

	@IsString({ message: "Не указан пароль" })
	password: string;
}
