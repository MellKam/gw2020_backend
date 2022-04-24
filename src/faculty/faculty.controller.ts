import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ObjectIdType } from '../database/mongoose.utils';
import { MongoIdPipe } from '../database/pipes/mongo-id.pipe';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { FacultyService } from './faculty.service';

@Controller('faculty')
export class FacultyController {
	constructor(private facultyService: FacultyService) {}

	@Get()
	async getAllFaculties() {
		return this.facultyService.getAllFaculties();
	}

	@Get(':id')
	async getFacultyById(@Param('id', MongoIdPipe) id: string) {
		return this.facultyService.getFacultyById(id);
	}

	@Get(':id/specification')
	async getSpecificationsByFacultyId(@Param('id', MongoIdPipe) id: string) {
		return this.facultyService.getSpecificationsByFacultyId(id);
	}

	@Post()
	async createFaculty(@Body() createFacultyDto: CreateFacultyDto) {
		return this.facultyService.createFaculty(createFacultyDto);
	}

	@Post(':id/specification')
	async addSpecification(
		@Param('id', MongoIdPipe) id: ObjectIdType,
		@Body() createSpecificationDto: CreateSpecificationDto,
	) {
		return this.facultyService.addSpecification(id, createSpecificationDto);
	}
}
