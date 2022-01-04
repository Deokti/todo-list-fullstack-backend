import { hash } from "bcryptjs";

export class User {
	_password: string;

	constructor(private readonly _email: string) {}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}
}
