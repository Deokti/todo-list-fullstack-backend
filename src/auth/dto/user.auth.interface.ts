import { IsEmail, IsString, Length, length } from "class-validator";

export class IUserAuthDto {
	@IsEmail({}, { message: "Неправильный Email" })
	email: string;

	@IsString({ message: "Не указан пароль" })
	@Length(5)
	password: string;
}
