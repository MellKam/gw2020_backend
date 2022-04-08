import {
	Body,
	Controller,
	Get,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
	constructor(private studentService: StudentService) {}

	@UsePipes(ValidationPipe)
	@Post()
	async create(@Body() studentDto: CreateStudentDto) {
		return this.studentService.create(studentDto);
	}

	@Get()
	async getAll() {
		return this.studentService.findAll();
	}
}
