import {
	Document,
	FilterQuery,
	Model,
	UpdateQuery,
	QueryOptions,
} from 'mongoose';
import { UpdateResult } from 'mongodb';

export abstract class EntityRepository<T extends Document> {
	constructor(protected readonly entityModel: Model<T>) {}

	create(entityData: unknown): T {
		return new this.entityModel(entityData);
	}

	async createAndSave(entityData: unknown): Promise<T> {
		return this.entityModel.create(entityData);
	}

	find(filter?: FilterQuery<T>) {
		return this.entityModel.find(filter);
	}

	async findAndExec(
		filter: FilterQuery<T>,
		projection?: Record<string, unknown>,
		options?: QueryOptions,
	): Promise<T[]> {
		return this.entityModel.find(filter, projection, options);
	}

	findOne(filter: FilterQuery<T>) {
		return this.entityModel.findOne(filter);
	}

	async findOneAndExec(
		filter: FilterQuery<T>,
		projection?: Record<string, unknown>,
		options?: QueryOptions,
	): Promise<T> {
		return await this.entityModel.findOne(filter, projection, options);
	}

	async updateOne(
		filter: FilterQuery<T>,
		updateData: UpdateQuery<unknown>,
	): Promise<UpdateResult> {
		return this.entityModel.updateOne(filter, updateData);
	}

	async findOneAndUpdate(
		filter: FilterQuery<T>,
		updateData: UpdateQuery<unknown>,
	): Promise<T> {
		return await this.entityModel.findOneAndUpdate(filter, updateData, {
			new: true,
			runValidators: true,
		});
	}

	async deleteOne(filter: FilterQuery<T>): Promise<boolean> {
		const deleteResult = await this.entityModel.deleteOne(filter);
		return deleteResult.deletedCount >= 1;
	}

	async findOneAndDelete(filter: FilterQuery<T>): Promise<T> {
		return this.entityModel.findOneAndDelete(filter);
	}
}
