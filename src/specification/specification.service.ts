import { ConflictException, Injectable } from '@nestjs/common';
import { FacultyRepository } from '../faculty/faculty.repository';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { GetSpecificationResponseDto } from './dto/get-specification.response.dto';
import { SpecificationRepository } from './specification.repository';
import { Specification } from './specification.schema';

@Injectable()
export class SpecificationService {
	constructor(
		private specificationRepository: SpecificationRepository,
		private facultyRepository: FacultyRepository,
	) {}

	async getSpecificationById(id: string): Promise<GetSpecificationResponseDto> {
		try {
			const faculty = await this.facultyRepository
				.findOne({
					specifications: { $elemMatch: { _id: id } },
				})
				.select({ specifications: { $elemMatch: { _id: id } } })
				.exec();

			if (!faculty)
				throw new ConflictException(
					'Specification with this id does not exist',
				);

			return {
				specification: faculty.specifications[0],
				facultyId: faculty._id,
			} as GetSpecificationResponseDto;
		} catch (error) {
			throw error;
		}
	}

	async createSpecification(
		dto: CreateSpecificationDto,
	): Promise<Specification> {
		try {
			const specification = this.specificationRepository.create({
				name: dto.name,
			});

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

			return !!result.modifiedCount;
		} catch (error) {
			throw error;
		}
	}
}
