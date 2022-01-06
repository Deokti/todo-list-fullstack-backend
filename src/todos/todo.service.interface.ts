import { TodoModel } from "@prisma/client";
import { ITodoTdo } from "./dto/todo.dto";

export interface ITodoService {
	createTodo(todo: ITodoTdo): Promise<TodoModel>;
	find(author: string): Promise<TodoModel[]>;
	deleteTodo(id: string): Promise<void>;
}
