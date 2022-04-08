import { Injectable } from '@nestjs/common/decorators/core/';
import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from 'class-validator';
import { StudentRepository } from '../student.repository';

@ValidatorConstraint({ name: 'StudentExistRule', async: true })
@Injectable()
export class StudentExistRule implements ValidatorConstraintInterface {
	constructor(private studentRepository: StudentRepository) {}

	async validate(text: string) {
		return !(await this.studentRepository.getOne(text));
	}

	defaultMessage(args: ValidationArguments) {
		return `Student with fullName '${args.value}' already exist`;
	}
}
