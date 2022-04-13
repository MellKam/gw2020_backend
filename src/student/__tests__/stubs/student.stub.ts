import { GWStatus } from '../../schemas/gw-status.enum';
import { Student } from '../../schemas/student.schema';
import { TypesObjectId } from '../../../database/mongoose.utils';

const testObjectId = new TypesObjectId();

export const studentStub: () => Student = () => ({
	_id: testObjectId,
	full_name: 'student_1',
	gw: {
		topic: 'some',
		status: GWStatus.STARTED,
		gw_info: testObjectId,
	},
	group: testObjectId,
});
