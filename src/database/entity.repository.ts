import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { DocReset } from './mongoose.utils';
import { parseNestData } from './nest-data.parser';

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

	async find(filter?: FilterQuery<T>): Promise<T[]> {
		return await this.entityModel.find(filter);
	}

	async findOne(filter: FilterQuery<T>, projection?: Record<string, unknown>) {
		return await this.entityModel.findOne(filter, {
			...DocReset,
			...projection,
		});
	}

	async findOneAndUpdate(
		filter: FilterQuery<T>,
		updateData: UpdateQuery<unknown>,
	): Promise<T> {
		return await this.entityModel.findOneAndUpdate(
			filter,
			parseNestData(updateData),
			{
				new: true,
				projection: DocReset,
			},
		);
	}

	async deleteOne(filter: FilterQuery<T>): Promise<boolean> {
		const deleteResult = await this.entityModel.deleteOne(filter);
		return deleteResult.deletedCount >= 1;
	}
}
