export class ErrorWithCode extends Error {
	constructor(public code: number) {
		super('Error');
	}
}
