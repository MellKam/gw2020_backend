import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { Student } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentRepository } from './student.repository';
import { UpdateStudentDto } from './dto/update-student.dto';
import { GroupRepository } from '../group/group.repository';
import { ClientSession } from 'mongodb';

@Injectable()
export class StudentService {
	constructor(
		private studentRepository: StudentRepository,
		private groupRepository: GroupRepository,
	) {}

	async create(createStudentDto: CreateStudentDto, dbSession: ClientSession) {
		try {
			const group = await this.groupRepository.findOneWithSession(
				{
					_id: createStudentDto.group,
				},
				dbSession,
			);
			if (!group)
				throw new ConflictException('Group with this id does not exist');

			const student = await this.studentRepository.createWithSession(
				createStudentDto,
				dbSession,
			);

			group.students.push(student._id);
			await group.save({ session: dbSession });

			return student;
		} catch (error) {
			if (error.code === 11000)
				throw new ConflictException('Student with this name already exist');

			if (error instanceof ConflictException) throw error;

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
