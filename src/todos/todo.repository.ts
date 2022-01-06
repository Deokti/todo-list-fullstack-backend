import { TodoModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { PrismaService } from "../database/prisma.service";
import { Todo } from "./todo.entity";
import { ITodoRepository } from "./todo.repository.interface";
import "reflect-metadata";

@injectable()
export class TodoRepository implements ITodoRepository {
	constructor(@inject(INVERSIFY_TYPES.PrismaService) private prismaService: PrismaService) { }

	async create(todo: Todo): Promise<TodoModel> {
		const { author, date, priority, title, workflow } = todo;

		return await this.prismaService.client.todoModel.create({
			data: {
				author,
				date: date.toString(),
				priority,
				title,
				workflow,
			},
		});
	}

	async find(author: string): Promise<TodoModel[]> {
		return await this.prismaService.client.todoModel.findMany({
			where: {
				author: author,
			},
		});
	}

	async detele(id: string): Promise<void> {
		await this.prismaService.client.todoModel.delete({
			where: {
				id,
			},
		});
	}

	async update(todo: TodoModel): Promise<void> {
		const { author, date, id, priority, title, workflow } = todo;
		await this.prismaService.client.todoModel.update({
			where: {
				id,
			},
			data: {
				author,
				date,
				priority,
				title,
				workflow,
			},
		});
	}
}
