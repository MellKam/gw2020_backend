import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentModel } from './student.schema';
import { StudentRepository } from './student.repository';

@Module({
	imports: [MongooseModule.forFeature([StudentModel])],
	controllers: [StudentController],
	providers: [StudentService, StudentRepository],
	exports: [StudentRepository],
})
export class StudentModule {}
