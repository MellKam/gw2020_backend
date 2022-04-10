import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { Student } from './student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentRepository } from './student.repository';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
	constructor(private studentRepository: StudentRepository) {}

	async create(createStudentDto: CreateStudentDto): Promise<Student> {
		try {
			return await this.studentRepository.create(createStudentDto);
		} catch (error) {
			if (error.code === 11000)
				throw new ConflictException('Student with this name already exist');
			throw new InternalServerErrorException('Error while creating student');
		}
	}

	async findAll(): Promise<Student[]> {
		return this.studentRepository.find();
	}

	async deleteById(id: string): Promise<boolean> {
		const isDeleted = await this.studentRepository.deleteOne({ _id: id });

		if (!isDeleted)
			throw new ConflictException('Student with this id does not exist');

		return isDeleted;
	}

	async findById(id: string): Promise<Student> {
		const response = await this.studentRepository.findOne({ _id: id });

		if (!response)
			throw new ConflictException('Student with this id does not exist');

		return response;
	}

	async updateById(
		id: string,
		updateStudentDto: UpdateStudentDto,
	): Promise<Student> {
		try {
			const response = await this.studentRepository.findOneAndUpdate(
				{ _id: id },
				updateStudentDto,
			);

			if (!response)
				throw new ConflictException('Student with this id does not exist');

			return response;
		} catch (error) {
			if (error.code === 11000)
				throw new ConflictException('Student with this name already exist');
			throw new InternalServerErrorException('Error while updating student');
		}
	}
}
