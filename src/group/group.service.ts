import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { PutGwInfoDto } from './dto/put-gw-info.dto';
import { GroupRepository } from './group.repository';
import { Group } from './schemas/group.schema';
import { GWInfo } from './schemas/gw-info.schema';

@Injectable()
export class GroupService {
	constructor(private groupRepository: GroupRepository) {}

	async create(createGroupDto: CreateGroupDto): Promise<Group> {
		try {
			return this.groupRepository.create(createGroupDto).save();
		} catch (error) {
			throw error;
		}
	}

	async getAllGroups(): Promise<Group[]> {
		return this.groupRepository.find();
	}

	async getGroupById(id: string): Promise<Group> {
		try {
			const group = await this.groupRepository.findOneAndExec({ _id: id });
			if (!group)
				throw new ConflictException('Group with this id does not exist');

			return group;
		} catch (error) {
			throw error;
		}
	}

	async putGwInfoByGroupId(
		id: string,
		putGwInfoDto: PutGwInfoDto,
	): Promise<GWInfo> {
		try {
			const group = await this.groupRepository.findOneAndExec({
				_id: id,
			});

			if (!group)
				throw new ConflictException('Group with this id does not exist');

			group.gw_info = putGwInfoDto;
			await group.save();

			return group.gw_info;
		} catch (error) {
			throw error;
		}
	}
}
