import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { DocReset } from './mongoose.utils';
import { ClientSession } from 'mongodb';

export abstract class EntityRepository<T extends Document> {
	constructor(protected readonly entityModel: Model<T>) {}

	/**
	 * @param entityData is the data to create a new entity
	 *
	 * @returns Unsaved entity.
	 * For add entity to databese use save() method.
	 */
	create(entityData: unknown): T {
		return new this.entityModel(entityData);
	}

	async createWithSession(
		entityData: unknown,
		session: ClientSession,
	): Promise<T> {
		return new this.entityModel(entityData).save({ session });
	}

	async find(filter?: FilterQuery<T>): Promise<T[]> {
		return await this.entityModel.find(filter);
	}

	async findWithSession(
		filter: FilterQuery<T>,
		session: ClientSession,
	): Promise<T[]> {
		return await this.entityModel.find(filter, { session });
	}

	async findOne(
		filter: FilterQuery<T>,
		projection?: Record<string, unknown>,
	): Promise<T> {
		return await this.entityModel.findOne(filter, {
			...projection,
		});
	}

	async findOneWithSession(
		filter: FilterQuery<T>,
		session: ClientSession,
	): Promise<T> {
		return await this.entityModel.findOne(filter, {}, { session });
	}

	async updateOne(
		filter: FilterQuery<T>,
		updateData: UpdateQuery<unknown>,
	): Promise<T> {
		return this.entityModel.findOneAndUpdate(filter, updateData, {
			new: true,
			projection: DocReset,
			runValidators: true,
		});
	}

	async updateOneWithSession(
		filter: FilterQuery<T>,
		updateData: UpdateQuery<unknown>,
		session: ClientSession,
	): Promise<T> {
		return this.entityModel.findOneAndUpdate(filter, updateData, {
			new: true,
			projection: DocReset,
			session,
		});
	}

	async findOneAndUpdate(
		filter: FilterQuery<T>,
		updateData: UpdateQuery<unknown>,
	): Promise<T> {
		return await this.entityModel.findOneAndUpdate(filter, updateData, {
			new: true,
			projection: DocReset,
			runValidators: true,
			context: 'query',
		});
	}

	async findOneAndUpdateWithSession(
		filter: FilterQuery<T>,
		updateData: UpdateQuery<unknown>,
		session: ClientSession,
	): Promise<T> {
		return await this.entityModel.findOneAndUpdate(filter, updateData, {
			new: true,
			projection: DocReset,
			session,
		});
	}

	async deleteOne(filter: FilterQuery<T>): Promise<boolean> {
		const deleteResult = await this.entityModel.deleteOne(filter);
		return deleteResult.deletedCount >= 1;
	}

	async deleteOneWithSession(
		filter: FilterQuery<T>,
		session: ClientSession,
	): Promise<boolean> {
		const deleteResult = await this.entityModel.deleteOne(filter, {
			session,
		});
		return deleteResult.deletedCount >= 1;
	}

	async findOneAndDelete(filter: FilterQuery<T>): Promise<T> {
		return this.entityModel.findOneAndDelete(filter);
	}

	async findOneAndDeleteWithSession(
		filter: FilterQuery<T>,
		session: ClientSession,
	): Promise<T> {
		return this.entityModel.findOneAndDelete(filter, {
			session,
		});
	}
}
