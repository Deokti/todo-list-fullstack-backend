import { Container, ContainerModule } from "inversify";
import { App } from "./app";
import { IDotenvService } from "./dotenv/dotenv.service.interface";
import { DotenvService } from "./dotenv/dotenv.service";
import { TYPES } from "./config/inversify.types";
import "reflect-metadata";
import { LoggerService } from "./logger/logger.service";

const appBinding = new ContainerModule((bind) => {
	bind<IDotenvService>(TYPES.DotenvService).to(DotenvService);
	bind<LoggerService>(TYPES.Logger).to(LoggerService);
	bind<App>(TYPES.App).to(App);
});

function bootstrap(): void {
	const appContainer = new Container();
	appContainer.load(appBinding);

	const app = appContainer.get<App>(TYPES.App);
	app.init();
}

bootstrap();
