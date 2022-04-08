import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentModel } from '../schemas/student.schema';
import { StudentRepository } from './student.repository';
import { StudentExistRule } from './validations/student-exist.rule';

@Module({
	imports: [MongooseModule.forFeature([StudentModel])],
	controllers: [StudentController],
	providers: [StudentService, StudentRepository, StudentExistRule],
	exports: [StudentRepository],
})
export class StudentModule {}
