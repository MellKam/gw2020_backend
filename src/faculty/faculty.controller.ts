import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { FacultyService } from './faculty.service';

@Controller('faculty')
export class FacultyController {
	constructor(private facultyService: FacultyService) {}

	@Get()
	async getAllFaculties() {
		return this.facultyService.getAllFaculties();
	}

	@Get(':direction_name')
	async getFacultyById(@Param('direction_name') directionName: string) {
		return this.facultyService.getFacultyByDirectionName(directionName);
	}

	@Post()
	async createFaculty(@Body() bodyDto: CreateFacultyDto) {
		return this.facultyService.createFaculty(bodyDto);
	}

	@Delete(':direction_name')
	async deleteFacultyByDirectionName(
		@Param('direction_name') directionName: string,
	) {
		return this.facultyService.deleteFacultyByDirectionName(directionName);
	}

	// @Get(':direction_name/specification/:name')
}
