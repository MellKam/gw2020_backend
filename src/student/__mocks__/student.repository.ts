import { studentStub } from '../__tests__/stubs/student.stub';

const student = studentStub();

export const StudentRepository = jest.fn().mockReturnValue({
	create: jest.fn().mockReturnValue({ save: () => student }),
	find: jest.fn().mockResolvedValue([student]),
	findOne: jest.fn().mockResolvedValue(student),
	findOneAndUpdate: jest.fn().mockResolvedValue(student),
	deleteOne: jest.fn().mockResolvedValue(true),
});
