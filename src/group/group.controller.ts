import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MongoIdPipe } from '../database/pipes/mongo-id.pipe';
import { CreateGroupDto } from './dto/create-group.dto';
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
	async getAllGroups(): Promise<Group[]> {
		return this.groupService.getAllGroups();
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
}
