import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacultyModule } from '../faculty/faculty.module';
import { SpecificationController } from './specification.controller';
import { SpecificationRepository } from './specification.repository';
import { SpecificationImport } from './specification.schema';
import { SpecificationService } from './specification.service';

@Module({
	imports: [MongooseModule.forFeature([SpecificationImport]), FacultyModule],
	controllers: [SpecificationController],
	providers: [SpecificationService, SpecificationRepository],
})
export class SpecificationModule {}
