import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentImport } from './schemas/student.schema';
import { StudentRepository } from './student.repository';
import { GroupModule } from '../group/group.module';
import { DatabaseModule } from '../database/database.module';

@Module({
	imports: [
		MongooseModule.forFeature([StudentImport]),
		GroupModule,
		DatabaseModule,
	],
	controllers: [StudentController],
	providers: [StudentService, StudentRepository],
	exports: [StudentRepository],
})
export class StudentModule {}
