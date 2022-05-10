import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FacultyImport } from './faculty.schema';
import { FacultyRepository } from './faculty.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
	imports: [MongooseModule.forFeature([FacultyImport]), DatabaseModule],
	providers: [FacultyService, FacultyRepository],
	controllers: [FacultyController],
	exports: [FacultyRepository],
})
export class FacultyModule {}
