import { TodoModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { ITodoTdo } from "./dto/todo.dto";
import { Todo } from "./todo.entity";
import { ITodoRepository } from "./todo.repository.interface";
import { ITodoService } from "./todo.service.interface";
import "reflect-metadata";

@injectable()
export class TodoService implements ITodoService {
	constructor(@inject(INVERSIFY_TYPES.TodoRepository) private todoRepository: ITodoRepository) { }

	createTodo(todo: ITodoTdo): Promise<TodoModel> {
		const { title, priority, workflow, author } = todo;
		const newTodo = new Todo(title, priority, workflow, author);

		return this.todoRepository.create(newTodo);
	}

	find(author: string): Promise<TodoModel[]> {
		return this.todoRepository.find(author);
	}

	async deleteTodo(id: string): Promise<void> {
		await this.todoRepository.detele(id);
	}
}
