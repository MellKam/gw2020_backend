import { PutGwDto } from './dto/put-gw.dto';
import { UpdateGwDto } from './dto/update-gw.dto';
import {
	ConflictException,
	Injectable,
	BadRequestException,
} from '@nestjs/common';
import { Student } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentRepository } from './student.repository';
import { UpdateStudentDto } from './dto/update-student.dto';
import { GroupRepository } from '../group/group.repository';
import { ClientSession } from 'mongodb';
import { parseNestData } from '../utils/object-modifier';
import { GW } from './schemas/gw.schema';
import { MongooseValidationError } from '../database/mongoose.utils';
import { Group } from '../group/schemas/group.schema';

@Injectable()
export class StudentService {
	constructor(
		private studentRepository: StudentRepository,
		private groupRepository: GroupRepository,
	) {}

	async createStudent(
		createStudentDto: CreateStudentDto,
		dbSession: ClientSession,
	): Promise<Student> {
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

			throw error;
		}
	}

	async findAllStudents(): Promise<Student[]> {
		try {
			return this.studentRepository.find();
		} catch (error) {
			throw error;
		}
	}

	async deleteStudentById(
		id: string,
		dbSession: ClientSession,
	): Promise<Student> {
		try {
			const student = await this.studentRepository.findOneAndDeleteWithSession(
				{ _id: id },
				dbSession,
			);

			if (!student)
				throw new ConflictException('Student with this id does not exist');

			await this.groupRepository.updateOneWithSession(
				{ _id: student.group },
				{ $pull: { students: student._id } },
				dbSession,
			);

			return student;
		} catch (error) {
			throw error;
		}
	}

	async findStudentById(id: string): Promise<Student> {
		try {
			const response = await this.studentRepository.findOne({ _id: id });
			if (!response)
				throw new ConflictException('Student with this id does not exist');

			return response;
		} catch (error) {
			throw error;
		}
	}

	async updateGwByStudentId(id: string, updateGwDto: UpdateGwDto): Promise<GW> {
		try {
			const student = await this.studentRepository.findOne({ _id: id });

			// cycle for update student.gw object with fields of updateGwDto
			for (const key in updateGwDto) {
				student.gw[key] = updateGwDto[key];
			}

			await student.save();
			return student.gw;
		} catch (error) {
			if (error instanceof MongooseValidationError) {
				throw new BadRequestException(error.message);
			}
			throw error;
		}
	}

	async putGwByStudentId(id: string, putGwDto: PutGwDto): Promise<GW> {
		try {
			const student = await this.studentRepository.findOne({
				_id: id,
			});

			if (!student)
				throw new ConflictException('Student with this id does not exist');

			await student.populate({
				path: 'group',
				select: 'gw_info._id',
			});

			const groupGwInfo = (student.group as Group).gw_info;

			if (!groupGwInfo)
				throw new ConflictException(
					"Student's group does'nt have gw_info filed",
				);

			const studentGw: GW = {
				gw_info: groupGwInfo._id,
				topic: putGwDto.topic,
			};

			student.gw = studentGw;
			await student.save();

			return student.gw;
		} catch (error) {
			throw error;
		}
	}

	async updateStudentById(
		id: string,
		updateStudentDto: UpdateStudentDto,
	): Promise<Student> {
		try {
			const response = await this.studentRepository.updateOne(
				{ _id: id },
				parseNestData(updateStudentDto),
			);

			if (!response)
				throw new ConflictException('Student with this id does not exist');

			return response;
		} catch (error) {
			if (error.code === 11000)
				throw new ConflictException('Student with this name already exist');
			throw error;
		}
	}
}
