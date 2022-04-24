import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { FacultyDocument } from './schemas/faculty.schema';

@Injectable()
export class FacultyRepository extends EntityRepository<FacultyDocument> {
	constructor(@InjectModel('Faculty') facultyModel: Model<FacultyDocument>) {
		super(facultyModel);
	}
}
