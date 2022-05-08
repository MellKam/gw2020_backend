import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { FacultyRepository } from './faculty.repository';
import { Faculty } from './faculty.schema';

@Injectable()
export class FacultyService {
	constructor(private facultyRepository: FacultyRepository) {}

	async getAllFaculties(): Promise<Faculty[]> {
		try {
			return this.facultyRepository.findAndExec({});
		} catch (error) {
			throw error;
		}
	}

	async getFacultyByDirectionName(directionName: string) {
		try {
			return this.facultyRepository.findOneAndExec({
				direction_name: directionName,
			});
		} catch (error) {
			throw error;
		}
	}

	async createFaculty(dto: CreateFacultyDto) {
		try {
			return await this.facultyRepository.createAndSave(dto);
		} catch (error) {
			if (error.code === 11000)
				throw new ConflictException(
					'Faculty with this direction_name already exist',
				);
			throw error;
		}
	}

	async deleteFacultyByDirectionName(directionName: string): Promise<boolean> {
		try {
			return this.facultyRepository.deleteOne({
				direction_name: directionName,
			});
		} catch (error) {
			throw error;
		}
	}
}
