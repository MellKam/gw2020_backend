import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MongoIdPipe } from '../database/pipes/mongo-id.pipe';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { GetSpecificationResponseDto } from './dto/get-specification.response.dto';
import { Specification } from './specification.schema';
import { SpecificationService } from './specification.service';

@Controller('specification')
export class SpecificationController {
	constructor(private specificationService: SpecificationService) {}

	@Get(':id')
	async getSpecificationById(
		@Param('id', MongoIdPipe) id: string,
	): Promise<GetSpecificationResponseDto> {
		return this.specificationService.getSpecificationById(id);
	}

	// @Get(':name')
	// async getSpecificationByName(
	// 	@Param('name') specificationName: string,
	// 	@Query('facultyDirectionName') facultyDirectionName?: string,
	// ) {
	// 	return this.getSpecificationByName(specificationName, facultyDirectionName);
	// }

	@Post()
	async createSpecification(
		@Body() dto: CreateSpecificationDto,
	): Promise<Specification> {
		return this.specificationService.createSpecification(dto);
	}

	@Delete(':id')
	async deleteSpecificationById(
		@Param('id', MongoIdPipe) id: string,
	): Promise<boolean> {
		return this.specificationService.deleteSpecificationById(id);
	}
}
