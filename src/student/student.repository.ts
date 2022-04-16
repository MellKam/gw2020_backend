import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Student, StudentDocument } from './schemas/student.schema';

@Injectable()
export class StudentRepository extends EntityRepository<StudentDocument> {
	constructor(@InjectModel('Student') studentModel: Model<StudentDocument>) {
		super(studentModel);
	}
}
