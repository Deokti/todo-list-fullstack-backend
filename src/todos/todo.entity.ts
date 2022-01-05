export class Todo {
	private _title: string;
	private _priority: string;
	private _workflow: string;
	private _author: string;
	private _date: Date;

	constructor(title: string, priority: string, workflow: string, author: string) {
		this._title = title;
		this._priority = priority;
		this._workflow = workflow;
		this._author = author;
		this._date = new Date();
	}

	get title(): string {
		return this._title;
	}
	get priority(): string {
		return this._priority;
	}
	get workflow(): string {
		return this._workflow;
	}
	get author(): string {
		return this._author;
	}
	get date(): Date {
		return this._date;
	}
}
