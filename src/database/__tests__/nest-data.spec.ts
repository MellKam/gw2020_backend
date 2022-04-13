import { TypesObjectId } from '../mongoose.utils';
import { parseNestData } from '../nest-data.parser';

const testObjectId = new TypesObjectId();

const data = {
	_id: testObjectId,
	gw: {
		topic: 'some',
		status: 'STARTED',
		nest: {
			data: 5,
		},
	},
};

const expectedData = {
	_id: testObjectId.toHexString(),
	'gw.topic': 'some',
	'gw.status': 'STARTED',
	'gw.nest.data': 5,
};

describe('nest data test', () => {
	test('test', () => {
		expect(parseNestData(data)).toEqual(expectedData);
	});
});
