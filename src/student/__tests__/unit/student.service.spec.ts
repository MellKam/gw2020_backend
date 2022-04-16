// import { Test, TestingModule } from '@nestjs/testing';
// import { CreateStudentDto } from '../../dto/create-student.dto';
// import { UpdateStudentDto } from '../../dto/update-student.dto';
// import { StudentRepository } from '../../student.repository';
// import { Student } from '../../schemas/student.schema';
// import { StudentService } from '../../student.service';
// import { studentStub } from '../stubs/student.stub';
// import { ClientSession, ObjectIdType } from '../../../database/mongoose.utils';
// import {
// 	ConflictException,
// 	InternalServerErrorException,
// } from '@nestjs/common';
// import { ErrorWithCode } from '../../../utils/error-with-code';

// jest.mock('../../student.repository');

// describe('StudentService', () => {
// 	let studentService: StudentService;
// 	let studentRepository: StudentRepository;

// 	beforeEach(async () => {
// 		const moduleFixture: TestingModule = await Test.createTestingModule({
// 			providers: [StudentService, StudentRepository],
// 		}).compile();

// 		studentService = moduleFixture.get<StudentService>(StudentService);
// 		studentRepository = moduleFixture.get<StudentRepository>(StudentRepository);

// 		jest.clearAllMocks();
// 	});

// 	describe('create', () => {
// 		describe('when create is successfully called', () => {
// 			let student: Student;
// 			let createStudentDto: CreateStudentDto;

// 			beforeEach(async () => {
// 				const tempStudent = studentStub();
// 				createStudentDto = {
// 					full_name: tempStudent.full_name,
// 					gw: {
// 						topic: tempStudent.gw.topic,
// 						gw_info: tempStudent.gw.gw_info as ObjectIdType,
// 					},
// 					group: tempStudent.group as ObjectIdType,
// 				};
// 				student = await studentService.create(createStudentDto, {} as ClientSession);});
// 			});

// 			test('then is shoud call studentRepository', () => {
// 				expect(studentRepository.create).toHaveBeenCalledWith(createStudentDto, {});
// 			});

// 			test('then it shoud return a student', () => {
// 				expect(student).toEqual(studentStub());
// 			});
// 		});

// 		describe('when create is called with invalid data', () => {
// 			test('then it shoud throw an internal error', async () => {
// 				try {
// 					studentRepository.create = jest.fn().mockImplementation(() => {
// 						throw new Error();
// 					});
// 					await studentService.create({} as CreateStudentDto, {} as ClientSession);
// 				} catch (error) {
// 					expect(error).toBeInstanceOf(InternalServerErrorException);
// 				}
// 			});

// 			test('then it shoud throw an conflic error', async () => {
// 				try {
// 					studentRepository.create = jest.fn().mockImplementation(() => {
// 						throw new ErrorWithCode(11000);
// 					});
// 					await studentService.create({} as CreateStudentDto, {} as ClientSession);
// 				} catch (error) {
// 					expect(error).toBeInstanceOf(ConflictException);
// 				}
// 			});
// 		});
// 	});

// 	describe('updateById', () => {
// 		describe('when updateById is called', () => {
// 			let student: Student;
// 			let studentID: string;
// 			let updateStudentDto: UpdateStudentDto;

// 			beforeEach(async () => {
// 				const tempStudent = studentStub();
// 				studentID = tempStudent._id.toHexString();
// 				updateStudentDto = {
// 					gw: {
// 						topic: tempStudent.gw.topic,
// 					},
// 				};
// 				student = await studentService.updateById(studentID, updateStudentDto);
// 			});

// 			test('then is shoud call studentRepository', () => {
// 				expect(studentRepository.findOneAndUpdate).toHaveBeenCalledWith(
// 					{ _id: studentID },
// 					updateStudentDto,
// 				);
// 			});

// 			test('then it shoud return a student', () => {
// 				expect(student).toEqual(studentStub());
// 			});
// 		});
// 	});
// });
