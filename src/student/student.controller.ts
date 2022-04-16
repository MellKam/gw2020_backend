import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseInterceptors,
} from '@nestjs/common';
import { DbSession } from '../database/decorators/db-session.decorator';
import { MongoIdPipe } from '../database/pipes/mongo-id.pipe';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './schemas/student.schema';
import { StudentService } from './student.service';
import { ClientSession } from '../database/mongoose.utils';
import { TransactionInterceptor } from '../database/interceptors/transaction.interceptor';

@Controller('student')
export class StudentController {
	constructor(private studentService: StudentService) {}

	@Post()
	@UseInterceptors(TransactionInterceptor)
	async create(
		@Body() createStudentDto: CreateStudentDto,
		@DbSession() dbSession: ClientSession,
	) {
		return this.studentService.create(createStudentDto, dbSession);
	}

	@Get()
	async getAll(): Promise<Student[]> {
		return this.studentService.findAll();
	}

	@Get(':id')
	async getById(@Param('id', MongoIdPipe) id: string): Promise<Student> {
		return this.studentService.findById(id);
	}

	@Patch(':id')
	async updateById(
		@Param('id', MongoIdPipe) id: string,
		@Body() updateStudentDto: UpdateStudentDto,
	): Promise<Student> {
		return this.studentService.updateById(id, updateStudentDto);
	}

	@Delete('/:id')
	async deleteById(@Param('id', MongoIdPipe) id: string): Promise<boolean> {
		return this.studentService.deleteById(id);
	}
}
