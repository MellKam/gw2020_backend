import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { MongooseDoc } from '../database/mongoose.utils';
import { Student } from './student.schema';

@Injectable()
export class StudentRepository extends EntityRepository<MongooseDoc<Student>> {
	constructor(
		@InjectModel(Student.name) userModel: Model<MongooseDoc<Student>>,
	) {
		super(userModel);
	}
}
