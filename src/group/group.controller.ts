import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { MongoIdPipe } from '../database/pipes/mongo-id.pipe';
import { CreateGroupDto } from './dto/create-group.dto';
import { GetGroupQueryDto } from './dto/get-group.query.dto';
import { GetGroupsQueryDto } from './dto/get-groups.query.dto';
import { PutGwInfoDto } from './dto/put-gw-info.dto';
import { GroupService } from './group.service';
import { Group, GroupDocument } from './schemas/group.schema';

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

	@Get(':number')
	async getGroupByNumber(
		@Param('number', ParseIntPipe) number: number,
		@Query() queryParams: GetGroupQueryDto,
	): Promise<GroupDocument> {
		return this.groupService.getGroupByNumber(number, queryParams);
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
