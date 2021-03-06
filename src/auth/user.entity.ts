import { compare, hash } from "bcryptjs";

export class User {
	_password: string;

	constructor(private readonly _email: string, private passwordHash?: string) {
		if (passwordHash) this._password = passwordHash;
	}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(password: string): Promise<boolean> {
		return compare(password, this._password);
	}
}
