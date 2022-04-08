import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from '../schemas/student.schema';
import { MongooseDoc } from '../utils/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
	constructor(
		@InjectModel(Student.name)
		private studentModel: Model<MongooseDoc<Student>>,
	) {}

	async create(createStudentDto: CreateStudentDto): Promise<Student> {
		return new this.studentModel(createStudentDto).save();
	}

	async findAll(): Promise<Student[]> {
		return this.studentModel.find().exec();
	}
}
