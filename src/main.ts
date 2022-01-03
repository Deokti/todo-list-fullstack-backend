import { Container, ContainerModule } from "inversify";
import { App } from "./app";
import { IDotenvService } from "./dotenv/dotenv.service.interface";
import { DotenvService } from "./dotenv/dotenv.service";
import { INVERSIFY_TYPES } from "./config/inversify.types";
import "reflect-metadata";
import { LoggerService } from "./logger/logger.service";
import { AuthControllet } from "./auth/auth.controllet";

const appBinding = new ContainerModule((bind) => {
	bind<IDotenvService>(INVERSIFY_TYPES.DotenvService).to(DotenvService);
	bind<LoggerService>(INVERSIFY_TYPES.Logger).to(LoggerService);
	bind<AuthControllet>(INVERSIFY_TYPES.AuthControllet).to(AuthControllet);
	bind<App>(INVERSIFY_TYPES.App).to(App);
});

function bootstrap(): void {
	const appContainer = new Container();
	appContainer.load(appBinding);

	const app = appContainer.get<App>(INVERSIFY_TYPES.App);
	app.init();
}

bootstrap();
