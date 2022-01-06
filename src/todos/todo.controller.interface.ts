import { NextFunction, Request, Response } from "express";

export interface ITodoController {
	create(req: Request, res: Response, next: NextFunction): Promise<void>;
	findTodosByAuthor(req: Request, res: Response, next: NextFunction): Promise<void>;
	deleteTodoById(req: Request, res: Response, next: NextFunction): Promise<void>;
	update(req: Request, res: Response, next: NextFunction): Promise<void>;
}
