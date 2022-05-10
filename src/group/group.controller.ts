import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { MongoIdPipe } from '../database/pipes/mongo-id.pipe';
import { CreateGroupDto } from './dto/create-group.dto';
import { GetGroupsQueryDto } from './dto/get-groups.query.dto';
import { PutGwInfoDto } from './dto/put-gw-info.dto';
import { GroupService } from './group.service';
import { Group } from './schemas/group.schema';

@Controller('group')
export class GroupController {
	constructor(private groupService: GroupService) {}

	@Post()
	async create(@Body() createGroupDto: CreateGroupDto) {
		return this.groupService.create(createGroupDto);
	}

	@Get()
	async getAllGroups(
		@Query() { specificationId }: GetGroupsQueryDto,
	): Promise<Group[]> {
		return this.groupService.getAllGroups(specificationId);
	}

	@Get(':id')
	async getGroupById(@Param('id', MongoIdPipe) id: string): Promise<Group> {
		return this.groupService.getGroupById(id);
	}

	@Put(':id/gw_info')
	async putGwInfoByGroupId(
		@Param('id', MongoIdPipe) id: string,
		@Body() putGwInfoDto: PutGwInfoDto,
	): Promise<PutGwInfoDto> {
		return this.groupService.putGwInfoByGroupId(id, putGwInfoDto);
	}

	@Delete(':id')
	async deleteGroupById(@Param('id', MongoIdPipe) id: string) {
		return this.groupService.deleteGroupById(id);
	}
}
