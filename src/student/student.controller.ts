import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { MongoIdPipe } from '../database/pipes/mongo-id.pipe';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.schema';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
	constructor(private studentService: StudentService) {}

	@Post()
	async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
		return this.studentService.create(createStudentDto);
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
