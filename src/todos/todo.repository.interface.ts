import { TodoModel } from "@prisma/client";
import { Todo } from "./todo.entity";

export interface ITodoRepository {
	create(todo: Todo): Promise<TodoModel>;
	find(author: string): Promise<TodoModel[]>;
}
