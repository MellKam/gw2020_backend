import { Body, Controller, Post } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
	constructor(private groupService: GroupService) {}

	@Post()
	async create(@Body() createGroupDto: CreateGroupDto) {
		return this.groupService.create(createGroupDto);
	}
}
