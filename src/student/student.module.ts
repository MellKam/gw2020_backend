import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentImport } from './schemas/student.schema';
import { StudentRepository } from './student.repository';
import { MongoIdPipe } from '../database/pipes/mongo-id.pipe';

@Module({
	imports: [MongooseModule.forFeature([StudentImport]), MongoIdPipe],
	controllers: [StudentController],
	providers: [StudentService, StudentRepository],
	exports: [StudentRepository],
})
export class StudentModule {}
