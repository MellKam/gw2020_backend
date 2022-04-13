import { MockModel } from '../../../database/__tests__/support/mock.model';
import { Student } from '../../schemas/student.schema';
import { studentStub } from '../stubs/student.stub';

export class StudentModel extends MockModel<Student> {
	protected entityStub = studentStub();
}
