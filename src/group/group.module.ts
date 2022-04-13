import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupImport } from './schemas/group.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupRepository } from './group.repository';

@Module({
	imports: [MongooseModule.forFeature([GroupImport])],
	providers: [GroupService, GroupRepository],
	controllers: [GroupController],
})
export class GroupModule {}
