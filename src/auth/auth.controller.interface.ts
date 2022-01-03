export interface IAuthControllet {
	login: () => Promise<void>;
	register: () => Promise<void>;
}
