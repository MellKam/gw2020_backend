import { GW } from './schemas/gw.schema';
import { PutGwDto } from './dto/put-gw.dto';
import { UpdateGwDto } from './dto/update-gw.dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { MongoIdPipe } from '../database/pipes/mongo-id.pipe';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './schemas/student.schema';
import { StudentService } from './student.service';
import { GetStudentQueryDto } from './dto/get-student.query.dto';

@Controller('student')
export class StudentController {
	constructor(private studentService: StudentService) {}

	/**
	 * @link /student/
	 * @method POST
	 */
	@Post()
	async createStudent(
		@Body() createStudentDto: CreateStudentDto,
	): Promise<Student> {
		return this.studentService.createStudent(createStudentDto);
	}

	/**
	 * @link /student/
	 * @method GET
	 */
	@Get()
	async getAllStudents(): Promise<Student[]> {
		return this.studentService.findAllStudents();
	}

	@Get('gw')
	async getAllGws() {
		return this.studentService.findAllGws();
	}

	/**
	 * @link /student/:full_name
	 * @method GET
	 */
	@Get(':full_name')
	async getStudentByFullName(
		@Param('full_name') fullName: string,
		@Query() queryParams: GetStudentQueryDto,
	): Promise<Student> {
		return this.studentService.findStudentByFullName(fullName, queryParams);
	}

	/**
	 * @link /student/:id
	 * @method PATCH
	 */
	@Patch(':id')
	async updateStudentById(
		@Param('id', MongoIdPipe) id: string,
		@Body() updateStudentDto: UpdateStudentDto,
	): Promise<Student> {
		return this.studentService.updateStudentById(id, updateStudentDto);
	}

	/**
	 * @link /student/:id
	 * @method DELETE
	 */
	@Delete(':id')
	async deleteStudentById(
		@Param('id', MongoIdPipe) id: string,
	): Promise<Student> {
		return this.studentService.deleteStudentById(id);
	}

	/**
	 * @link /student/:id/gw
	 * @method PUT
	 */
	@Put(':id/gw')
	async putGwByStudentId(
		@Param('id', MongoIdPipe) id: string,
		@Body() putGwDto: PutGwDto,
	): Promise<GW> {
		return this.studentService.putGwByStudentId(id, putGwDto);
	}

	/**
	 * @link /student/:id/gw
	 * @method PATCH
	 */
	@Patch(':id/gw')
	async updateGwByStudentId(
		@Param('id', MongoIdPipe) id: string,
		@Body() updateGwDto: UpdateGwDto,
	): Promise<GW> {
		return this.studentService.updateGwByStudentId(id, updateGwDto);
	}
}
