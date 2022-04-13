import { DeleteResult } from 'mongodb';

export abstract class MockModel<T> {
	protected abstract entityStub: T;

	async find(): Promise<T[]> {
		return [this.entityStub];
	}

	async findOne(): Promise<T> {
		return this.entityStub;
	}

	async findOneAndUpdate(): Promise<T> {
		return this.entityStub;
	}

	async deleteOne(): Promise<DeleteResult> {
		return { deletedCount: 1, acknowledged: true };
	}
}
