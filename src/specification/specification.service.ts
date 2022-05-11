import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { FacultyRepository } from '../faculty/faculty.repository';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { GetSpecificationResponseDto } from './dto/get-specification.response.dto';
import { Specification } from './specification.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class SpecificationService {
	constructor(
		private readonly facultyRepository: FacultyRepository,
		private readonly databaseService: DatabaseService,
	) {}

	async getSpecificationById(id: string): Promise<GetSpecificationResponseDto> {
		try {
			const faculty = await this.facultyRepository
				.findOne({
					specifications: { $elemMatch: { _id: id } },
				})
				.select('specifications.$ direction_name')
				.exec();

			if (!faculty)
				throw new ConflictException(
					'Specification with this id does not exist',
				);

			return {
				specification: faculty.specifications[0],
				facultyDirectionName: faculty.direction_name,
			} as GetSpecificationResponseDto;
		} catch (error) {
			throw error;
		}
	}

	async createSpecification(
		dto: CreateSpecificationDto,
	): Promise<Specification> {
		try {
			const specification: Specification = {
				_id: new ObjectId(),
				name: dto.name,
				groupsNumber: 0,
			};

			await this.facultyRepository.updateOne(
				{
					_id: dto.faculty,
				},
				{ $push: { specifications: specification } },
			);

			return specification;
		} catch (error) {
			throw error;
		}
	}

	async deleteSpecificationById(id: string): Promise<boolean> {
		try {
			const result = await this.facultyRepository.updateOne(
				{
					specifications: { $elemMatch: { _id: id } },
				},
				{
					$pull: { specifications: { _id: id } },
				},
			);

			await this.databaseService.deleteRelatedToSpecification(id);

			return !!result.modifiedCount;
		} catch (error) {
			throw error;
		}
	}
}
