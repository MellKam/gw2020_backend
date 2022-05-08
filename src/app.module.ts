import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { GroupModule } from './group/group.module';
import { DatabaseModule } from './database/database.module';
import { FacultyModule } from './faculty/faculty.module';
import { SpecificationModule } from './specification/specification.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${
				process.env.NODE_ENV + (process.env.IS_LOCAL === 'true' ? '.local' : '')
			}`,
			isGlobal: true,
		}),
		DatabaseModule,
		StudentModule,
		GroupModule,
		FacultyModule,
		SpecificationModule,
	],
})
export class AppModule {}
