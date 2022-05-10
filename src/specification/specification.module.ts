import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FacultyModule } from '../faculty/faculty.module';
import { SpecificationController } from './specification.controller';
import { SpecificationService } from './specification.service';

@Module({
	imports: [FacultyModule, DatabaseModule],
	controllers: [SpecificationController],
	providers: [SpecificationService],
})
export class SpecificationModule {}
