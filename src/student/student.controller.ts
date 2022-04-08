import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './student.schema';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
	constructor(private studentService: StudentService) {}

	@Post()
	async create(@Body() studentDto: CreateStudentDto): Promise<Student> {
		return this.studentService.create(studentDto);
	}

	@Get()
	async getAll(): Promise<Student[]> {
		return this.studentService.findAll();
	}

	@Delete('/:id')
	async deleteById(@Param('id') id: string): Promise<boolean> {
		return this.studentService.deleteById(id);
	}
}
