import { Test, TestingModule } from '@nestjs/testing';
import { ObjectIdType } from '../../database/mongoose.utils';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { StudentController } from '../student.controller';
import { Student } from '../schemas/student.schema';
import { StudentService } from '../student.service';
import { studentStub } from './stubs/student.stub';

jest.mock('../student.service');

describe('StudentController', () => {
	let studentController: StudentController;
	let studentService: StudentService;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			controllers: [StudentController],
			providers: [StudentService],
		}).compile();

		studentController = moduleFixture.get<StudentController>(StudentController);
		studentService = moduleFixture.get<StudentService>(StudentService);

		jest.clearAllMocks();
	});

	describe('getById', () => {
		describe('when getById is called', () => {
			let studentId: string;
			let student: Student;

			beforeEach(async () => {
				studentId = studentStub()._id.toHexString();
				student = await studentController.getById(studentId);
			});

			test('then is shoud call studentService', () => {
				expect(studentService.findById).toHaveBeenCalledWith(studentId);
			});

			test('then it shoud return a student', () => {
				expect(student).toEqual(studentStub());
			});
		});
	});

	describe('create', () => {
		describe('when create is called', () => {
			let student: Student;
			let createStudentDto: CreateStudentDto;

			beforeEach(async () => {
				const tempStudent = studentStub();
				createStudentDto = {
					full_name: tempStudent.full_name,
					gw: {
						topic: tempStudent.gw.topic,
						gw_info: tempStudent.gw.gw_info as ObjectIdType,
					},
					group: tempStudent.group as ObjectIdType,
				};
				student = await studentController.create(createStudentDto);
			});

			test('then is shoud call studentService', () => {
				expect(studentService.create).toHaveBeenCalledWith(createStudentDto);
			});

			test('then it shoud return a student', () => {
				expect(student).toEqual(studentStub());
			});
		});
	});

	describe('getAll', () => {
		describe('when getAll is called', () => {
			let students: Student[];

			beforeEach(async () => {
				students = await studentController.getAll();
			});

			test('then is shoud call studentService', () => {
				expect(studentService.findAll).toHaveBeenCalled();
			});

			test('then it shoud return a students', () => {
				expect(students).toEqual([studentStub()]);
			});
		});
	});

	describe('updateById', () => {
		describe('when updateById is called', () => {
			let studentId: string;
			let updateStudentDto: UpdateStudentDto;
			let student: Student;

			beforeEach(async () => {
				const tempStudent = studentStub();

				studentId = tempStudent._id.toHexString();
				updateStudentDto = {
					full_name: tempStudent.full_name,
					gw: { grade: tempStudent.gw.grade },
				};

				student = await studentController.updateById(
					studentId,
					updateStudentDto,
				);
			});

			test('then is shoud call studentService', () => {
				expect(studentService.updateById).toHaveBeenCalledWith(
					studentId,
					updateStudentDto,
				);
			});

			test('then it shoud return a student', () => {
				expect(student).toEqual(studentStub());
			});
		});
	});

	describe('deleteById', () => {
		describe('when deleteById is called', () => {
			let response: boolean;
			let studentId: string;

			beforeEach(async () => {
				studentId = studentStub()._id.toHexString();
				response = await studentController.deleteById(studentId);
			});

			test('then is shoud call studentService', () => {
				expect(studentService.deleteById).toHaveBeenCalledWith(studentId);
			});

			test('then it shoud return a boolean response', () => {
				expect(response).toEqual(true);
			});
		});
	});
});
