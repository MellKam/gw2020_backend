import { ConflictException, Injectable } from '@nestjs/common';
import { ObjectIdType } from '../database/mongoose.utils';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { FacultyRepository } from './faculty.repository';
import { Faculty } from './schemas/faculty.schema';
import { Specification } from './schemas/specification.schema';

@Injectable()
export class FacultyService {
	constructor(private facultyRepository: FacultyRepository) {}

	async getAllFaculties(): Promise<Faculty[]> {
		try {
			return this.facultyRepository.find();
		} catch (error) {
			throw error;
		}
	}

	async getFacultyById(id: string): Promise<Faculty> {
		try {
			return this.facultyRepository.findOne({ _id: id });
		} catch (error) {
			throw error;
		}
	}

	async getSpecificationsByFacultyId(
		facultyId: string,
	): Promise<Specification[]> {
		try {
			const faculty = await this.facultyRepository.findOne(
				{ _id: facultyId },
				{ specifications: 1, _id: 0 },
			);

			if (!faculty)
				throw new ConflictException('Faculty with this id does not exist');

			return faculty.specifications;
		} catch (error) {
			throw error;
		}
	}

	async createFaculty(createFacultyDto: CreateFacultyDto) {
		try {
			return this.facultyRepository.create(createFacultyDto).save();
		} catch (error) {
			throw error;
		}
	}

	async addSpecification(
		facultyId: ObjectIdType,
		createSpecificationDto: CreateSpecificationDto,
	): Promise<Specification> {
		try {
			const faculty = await this.facultyRepository.findOne({ _id: facultyId });
			if (!faculty)
				throw new ConflictException('Faculty with this id does not exist');

			const specification: Specification = {
				...createSpecificationDto,
				faculty: facultyId,
			};

			faculty.specifications.push(specification);

			await faculty.save();
			return specification;
		} catch (error) {
			throw error;
		}
	}
}
