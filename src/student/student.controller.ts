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

	/**
	 * @link /student/
	 * @method POST
	 */
	@Post()
	@UseInterceptors(TransactionInterceptor)
	async createStudent(
		@Body() createStudentDto: CreateStudentDto,
		@DbSession() dbSession: ClientSession,
	): Promise<Student> {
		return this.studentService.createStudent(createStudentDto, dbSession);
	}

	/**
	 * @link /student/
	 * @method GET
	 */
	@Get()
	async getAllStudents(): Promise<Student[]> {
		return this.studentService.findAllStudents();
	}

	/**
	 * @link /student/:id
	 * @method GET
	 */
	@Get(':id')
	async getStudentById(@Param('id', MongoIdPipe) id: string): Promise<Student> {
		return this.studentService.findStudentById(id);
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
	@Delete('/:id')
	@UseInterceptors(TransactionInterceptor)
	async deleteStudentById(
		@Param('id', MongoIdPipe) id: string,
		@DbSession() dbSession: ClientSession,
	): Promise<Student> {
		return this.studentService.deleteStudentById(id, dbSession);
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
