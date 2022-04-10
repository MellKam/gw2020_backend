import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentModel } from './student.schema';
import { StudentRepository } from './student.repository';
import { MongoIdPipe } from '../database/pipes/mongo-id.pipe';

@Module({
	imports: [MongooseModule.forFeature([StudentModel]), MongoIdPipe],
	controllers: [StudentController],
	providers: [StudentService, StudentRepository],
	exports: [StudentRepository],
})
export class StudentModule {}
