import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { StudentRepository } from '../../student.repository';
import { Student } from '../../schemas/student.schema';
import { studentStub } from '../stubs/student.stub';
import { StudentModel } from '../support/student.model';
import { FilterQuery } from 'mongoose';
import { parseNestData } from '../../../utils/nest-data.parser';
import { CreateMockModel } from '../../../database/__tests__/support/create-mock.model';

describe('StudentRepository', () => {
	let studentRepository: StudentRepository;

	describe('queryOperations', () => {
		let studentModel: StudentModel;
		let studentFilterQuery: FilterQuery<Student>;

		beforeEach(async () => {
			const moduleFixture = await Test.createTestingModule({
				providers: [
					StudentRepository,
					{
						provide: getModelToken(Student.name),
						useClass: StudentModel,
					},
				],
			}).compile();

			studentRepository =
				moduleFixture.get<StudentRepository>(StudentRepository);
			studentModel = moduleFixture.get<StudentModel>(
				getModelToken(Student.name),
			);

			studentFilterQuery = {
				_id: studentStub()._id.toHexString(),
			};

			jest.clearAllMocks();
		});

		describe('findOne', () => {
			describe('when findOne is called', () => {
				let student: Student;

				beforeEach(async () => {
					jest.spyOn(StudentModel.prototype, 'findOne');
					student = await studentRepository.findOne(studentFilterQuery);
				});

				test('then is shoud call studentModel', () => {
					expect(studentModel.findOne).toHaveBeenCalledWith(
						studentFilterQuery,
						{
							_id: 0,
							__v: 0,
						},
					);
				});

				test('then it shoud return a student', () => {
					expect(student).toEqual(studentStub());
				});
			});
		});

		describe('find', () => {
			describe('when find is called', () => {
				let students: Student[];

				beforeEach(async () => {
					jest.spyOn(studentModel, 'find');
					students = await studentRepository.find(studentFilterQuery);
				});

				test('then is shoud call studentModel', () => {
					expect(studentModel.find).toHaveBeenCalledWith(studentFilterQuery);
				});

				test('then it shoud return a student', () => {
					expect(students).toEqual([studentStub()]);
				});
			});
		});

		describe('deleteOne', () => {
			describe('when deleteOne is called', () => {
				let result: boolean;

				beforeEach(async () => {
					jest.spyOn(studentModel, 'deleteOne');
					result = await studentRepository.deleteOne(studentFilterQuery);
				});

				test('then is shoud call studentModel', () => {
					expect(studentModel.deleteOne).toHaveBeenCalledWith(
						studentFilterQuery,
					);
				});

				test('then it shoud return a result', () => {
					expect(result).toEqual(true);
				});
			});
		});

		describe('findOneAndUpdate', () => {
			describe('when findOneAndUpdate is called', () => {
				let student: Student;

				beforeEach(async () => {
					jest.spyOn(studentModel, 'findOneAndUpdate');
					student = await studentRepository.findOneAndUpdate(
						studentFilterQuery,
						studentStub(),
					);
				});

				test('then is shoud call studentModel', () => {
					expect(studentModel.findOneAndUpdate).toHaveBeenCalledWith(
						studentFilterQuery,
						parseNestData(studentStub()),
						{ new: true, projection: { _id: 0, __v: 0 } },
					);
				});

				test('then it shoud return a student', () => {
					expect(student).toEqual(studentStub());
				});
			});
		});
	});

	describe('createOperations', () => {
		beforeEach(async () => {
			const moduleFixture = await Test.createTestingModule({
				providers: [
					StudentRepository,
					{
						provide: getModelToken(Student.name),
						useValue: CreateMockModel,
					},
				],
			}).compile();

			studentRepository =
				moduleFixture.get<StudentRepository>(StudentRepository);
		});

		describe('create', () => {
			describe('when create is called', () => {
				let student: Student;
				let constructorSpy: jest.SpyInstance;

				beforeEach(async () => {
					constructorSpy = jest.spyOn(
						CreateMockModel.prototype,
						'constructorSpy',
					);
					student = studentRepository.create(studentStub());
				});

				test('then is shoud call studentModel', () => {
					expect(constructorSpy).toHaveBeenCalledWith(studentStub());
				});

				test('then it shoud return a student', () => {
					expect(student).toEqual(studentStub());
				});
			});
		});
	});
});
