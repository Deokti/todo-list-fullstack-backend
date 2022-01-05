export const INVERSIFY_TYPES = {
	App: Symbol.for("App"),
	Logger: Symbol.for("Logger"),

	DotenvService: Symbol.for("DotenvService"),
	PrismaService: Symbol.for("PrismaService"),

	AuthControllet: Symbol.for("AuthControllet"),
	AuthService: Symbol.for("AuthService"),
	AuthRepository: Symbol.for("AuthRepository"),

	TodoController: Symbol.for("TodoController"),
	TodoService: Symbol.for("TodoService"),
	TodoRepository: Symbol.for("TodoRepository"),

	ExeptionFilter: Symbol.for("ExeptionFilter"),
};
