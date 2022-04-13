import { studentStub } from '../__tests__/stubs/student.stub';

const student = studentStub();

export const StudentService = jest.fn().mockReturnValue({
	create: jest.fn().mockResolvedValue(student),
	findAll: jest.fn().mockResolvedValue([student]),
	findById: jest.fn().mockResolvedValue(student),
	updateById: jest.fn().mockResolvedValue(student),
	deleteById: jest.fn().mockResolvedValue(true),
});
