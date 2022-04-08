import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from '../schemas/student.schema';
import { MongooseDoc } from '../utils/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StudentRepository {
	constructor(
		@InjectModel(Student.name)
		private studentModel: Model<MongooseDoc<Student>>,
	) {}

	async isExist(fullName: string): Promise<boolean> {
		return !!(await this.getOne(fullName));
	}

	async getOne(fullName: string): Promise<Student> {
		return await this.studentModel.findOne({ full_name: fullName }).exec();
	}

	async getAll(): Promise<Student[]> {
		return this.studentModel.find().exec();
	}
}
