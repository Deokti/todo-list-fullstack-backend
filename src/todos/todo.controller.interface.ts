import { NextFunction, Request, Response } from "express";

export interface ITodoController {
	create(req: Request, res: Response, next: NextFunction): Promise<void>;
	findTodosById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
