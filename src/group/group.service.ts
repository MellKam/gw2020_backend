import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupRepository } from './group.repository';
import { Group } from './schemas/group.schema';

@Injectable()
export class GroupService {
	constructor(private groupRepository: GroupRepository) {}

	create(createGroupDto: CreateGroupDto): Promise<Group> {
		return this.groupRepository.create(createGroupDto).save();
	}
}
