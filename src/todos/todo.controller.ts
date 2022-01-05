import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/base.controller";
import "reflect-metadata";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import { inject, injectable } from "inversify";
import { PrismaService } from "../database/prisma.service";
import { Todo } from "./todo.entity";

@injectable()
export class TodoController extends BaseController {
	constructor(
		@inject(INVERSIFY_TYPES.Logger) private loggerService: LoggerService,
		@inject(INVERSIFY_TYPES.PrismaService) private prismaService: PrismaService,
	) {
		super(loggerService);

		this.bindRouter([{ path: "/todos", method: "post", func: this.create }]);
		this.bindRouter([{ path: "/todos/:author", method: "get", func: this.findTodosById }]);
	}

	async create({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const { title, priority, workflow, author } = body;
		const todo = new Todo(title, priority, workflow, author);

		const create = await this.prismaService.client.todoModel.create({
			data: {
				title: todo.title,
				priority: todo.priority,
				workflow: todo.workflow,
				author: todo.author,
				date: todo.data.toString(),
			},
		});

		this.ok(res, create);
	}

	async findTodosById({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		console.log(params);

		const find = await this.prismaService.client.todoModel.findMany({
			where: {
				author: params.author,
			},
		});

		this.ok(res, find);
	}
}
