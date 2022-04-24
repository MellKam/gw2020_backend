import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FacultyImport } from './schemas/faculty.schema';
import { FacultyRepository } from './faculty.repository';

@Module({
	imports: [MongooseModule.forFeature([FacultyImport])],
	providers: [FacultyService, FacultyRepository],
	controllers: [FacultyController],
})
export class FacultyModule {}
