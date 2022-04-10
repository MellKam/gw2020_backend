import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
	constructor(protected readonly entityModel: Model<T>) {}

	async findOne(
		filter: FilterQuery<T>,
		projection?: Record<string, unknown>,
	): Promise<T | null> {
		return this.entityModel
			.findOne(filter, {
				_id: 0,
				__v: 0,
				...projection,
			})
			.exec();
	}

	async find(filter?: FilterQuery<T>): Promise<T[] | null> {
		return this.entityModel.find(filter).exec();
	}

	async create(entityData: unknown): Promise<T> {
		const entity = new this.entityModel(entityData);
		return entity.save();
	}

	async findOneAndUpdate(
		filter: FilterQuery<T>,
		updateData: UpdateQuery<unknown>,
	): Promise<T | null> {
		return this.entityModel.findOneAndUpdate(filter, updateData, {
			new: true,
		});
	}

	async deleteMany(filter: FilterQuery<T>): Promise<boolean> {
		const deleteResult = await this.entityModel.deleteMany(filter);
		return deleteResult.deletedCount >= 1;
	}

	async deleteOne(filter: FilterQuery<T>): Promise<boolean> {
		const deleteResult = await this.entityModel.deleteOne(filter);
		return deleteResult.deletedCount >= 1;
	}
}
