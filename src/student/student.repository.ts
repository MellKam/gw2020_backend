import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './student.schema';
import { MongooseDoc } from '../utils/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { DeleteResult } from 'mongodb';

@Injectable()
export class StudentRepository {
	constructor(
		@InjectModel(Student.name)
		private studentModel: Model<MongooseDoc<Student>>,
	) {}

	async getOne(fullName: string): Promise<Student> {
		return await this.studentModel.findOne({ full_name: fullName }).exec();
	}

	async getAll(): Promise<Student[]> {
		return await this.studentModel.find().exec();
	}

	async create(createStudentDto: CreateStudentDto): Promise<Student> {
		return await this.studentModel.create(createStudentDto);
	}

	async deleteOne(id: string): Promise<DeleteResult> {
		return await this.studentModel.deleteOne({ _id: id });
	}
}
