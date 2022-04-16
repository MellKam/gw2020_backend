import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { Connection } from 'mongoose';
import { DatabaseService } from '../../../database/database.service';
import { Student } from '../../schemas/student.schema';
import { studentStub } from '../stubs/student.stub';

describe('Student controller', () => {
	let dbConnection: Connection;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		const app = moduleFixture.createNestApplication();
		await app.init();

		dbConnection =
			moduleFixture.get<DatabaseService>(DatabaseService).connection;
	});

	describe('getById', async () => {
		await dbConnection.collection(Student.name).insertOne(studentStub(false));
	});
});
