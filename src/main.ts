import { Container, ContainerModule } from "inversify";
import { App } from "./app";
import { IDotenvService } from "./dotenv/dotenv.service.interface";
import { DotenvService } from "./dotenv/dotenv.service";
import { INVERSIFY_TYPES } from "./config/inversify.types";
import "reflect-metadata";
import { LoggerService } from "./logger/logger.service";
import { AuthControllet } from "./auth/auth.controller";
import { PrismaService } from "./database/prisma.service";
import { IAuthRepository } from "./auth/auth.repository.interface";
import { AuthRepository } from "./auth/auth.repository";
import { IAuthService } from "./auth/auth.service.interface";
import { AuthService } from "./auth/auth.service";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { ExeptionFilter } from "./errors/exeption.filter";
import { TodoController } from "./todos/todo.controller";
import { ITodoController } from "./todos/todo.controller.interface";
import { ITodoRepository } from "./todos/todo.repository.interface";
import { TodoRepository } from "./todos/todo.repository";
import { ITodoService } from "./todos/todo.service.interface";
import { TodoService } from "./todos/todo.service";

const appBinding = new ContainerModule((bind) => {
	bind<IDotenvService>(INVERSIFY_TYPES.DotenvService).to(DotenvService);
	bind<LoggerService>(INVERSIFY_TYPES.Logger).to(LoggerService);
	bind<PrismaService>(INVERSIFY_TYPES.PrismaService).to(PrismaService);

	bind<AuthControllet>(INVERSIFY_TYPES.AuthControllet).to(AuthControllet);
	bind<IAuthService>(INVERSIFY_TYPES.AuthService).to(AuthService);
	bind<IAuthRepository>(INVERSIFY_TYPES.AuthRepository).to(AuthRepository);

	bind<ITodoController>(INVERSIFY_TYPES.TodoController).to(TodoController);
	bind<ITodoService>(INVERSIFY_TYPES.TodoService).to(TodoService);
	bind<ITodoRepository>(INVERSIFY_TYPES.TodoRepository).to(TodoRepository);

	bind<IExeptionFilter>(INVERSIFY_TYPES.ExeptionFilter).to(ExeptionFilter);

	bind<App>(INVERSIFY_TYPES.App).to(App);
});

function bootstrap(): void {
	const appContainer = new Container();
	appContainer.load(appBinding);

	const app = appContainer.get<App>(INVERSIFY_TYPES.App);
	app.init();
}

bootstrap();
