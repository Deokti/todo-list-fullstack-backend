import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/base.controller";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import { inject, injectable } from "inversify";
import { ValidateMiddleware } from "../common/validate.middleware";
import { ITodoTdo } from "./dto/todo.dto";
import { ITodoController } from "./todo.controller.interface";
import { ITodoService } from "./todo.service.interface";
import { HTTPError } from "../errors/http-error";
import "reflect-metadata";

@injectable()
export class TodoController extends BaseController implements ITodoController {
	constructor(
		@inject(INVERSIFY_TYPES.Logger) private loggerService: LoggerService,
		@inject(INVERSIFY_TYPES.TodoService) private todoService: ITodoService,
	) {
		super(loggerService);

		this.bindRouter([
			{
				path: "/todos",
				method: "post",
				func: this.create,
				middleware: [new ValidateMiddleware(ITodoTdo)],
			},
		]);
		this.bindRouter([{ path: "/todos/:author", method: "get", func: this.findTodosByAuthor }]);
		this.bindRouter([{ path: "/todos/:id", method: "delete", func: this.deleteTodoById }]);
	}

	async create({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const todo = await this.todoService.createTodo(body);

		if (!todo) {
			return next(
				new HTTPError(
					422,
					"При создании произошла ошибка. Повторите попытку позже.",
					"TodoController",
				),
			);
		}

		this.ok(res, todo);
	}

	async findTodosByAuthor({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		const find = await this.todoService.find(params.author);
		this.ok(res, find);
	}

	async deleteTodoById({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		await this.todoService.deleteTodo(params.id);
		this.ok(res, `Задача ${params.id} удалена`);
	}
}
