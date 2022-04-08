import { ConflictException, Injectable } from '@nestjs/common';
import { Student } from './student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
	constructor(private studentRepository: StudentRepository) {}

	async create(createStudentDto: CreateStudentDto): Promise<Student> {
		try {
			return await this.studentRepository.create(createStudentDto);
		} catch (error) {
			if (error.code === 11000)
				throw new ConflictException('Student with this name already exist');
		}
	}

	async findAll(): Promise<Student[]> {
		return this.studentRepository.getAll();
	}

	async deleteById(id: string): Promise<boolean> {
		const isDeleted = !!(await this.studentRepository.deleteOne(id))
			.deletedCount;

		if (!isDeleted)
			throw new ConflictException('Student with this id does not exist');

		return isDeleted;
	}
}
