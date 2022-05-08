import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { SpecificationDocument } from './specification.schema';

@Injectable()
export class SpecificationRepository extends EntityRepository<SpecificationDocument> {
	constructor(
		@InjectModel('Specification')
		specificationModel: Model<SpecificationDocument>,
	) {
		super(specificationModel);
	}
}
