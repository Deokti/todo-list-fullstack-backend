import { NextFunction, Request, Response, Router } from "express";
import { IMiddleware } from "./middleware.interface";

export interface IControllerRoutes {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, "get" | "post" | "put" | "delete">;
	middleware?: IMiddleware[];
}

export type TExpressResponse = Response<any, Record<string, any>>;
