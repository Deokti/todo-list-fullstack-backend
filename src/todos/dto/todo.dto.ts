import { IsString, Length } from "class-validator";

export class ITodoTdo {
	@IsString()
	@Length(5)
	title: string;

	@IsString()
	priority: string;

	@IsString()
	workflow: string;

	@IsString()
	author: string;
}
