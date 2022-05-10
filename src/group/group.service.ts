import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { PutGwInfoDto } from './dto/put-gw-info.dto';
import { GroupRepository } from './group.repository';
import { Group, GroupDocument } from './schemas/group.schema';
import { GWInfo } from './schemas/gw-info.schema';
import { FilterQuery } from 'mongoose';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class GroupService {
	constructor(
		private readonly groupRepository: GroupRepository,
		private readonly databaseService: DatabaseService,
	) {}

	async create(dto: CreateGroupDto): Promise<Group> {
		try {
			const group = await this.groupRepository.createAndSave(dto);

			await this.databaseService.incrementSpecificationGroupsNumber(
				group.specification,
			);

			return group;
		} catch (error) {
			if (error.code === 11000)
				throw new ConflictException('Group with this number already exist');
			throw error;
		}
	}

	async getAllGroups(specificationId?: string): Promise<Group[]> {
		try {
			const filter: FilterQuery<GroupDocument> = {};

			if (specificationId) {
				filter.specification = specificationId;
			}

			return await this.groupRepository.find(filter);
		} catch (error) {
			throw error;
		}
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

	async deleteGroupById(id: string): Promise<Group> {
		try {
			const group = await this.groupRepository.findOneAndDelete({ _id: id });

			if (!group)
				throw new ConflictException('Group with this id does not exist');

			await this.databaseService.decrementSpecificationGroupsNumber(
				group.specification,
			);

			if (group.students.length) {
				await this.databaseService.deleteStudetsByIds(group.students);
			}

			return group;
		} catch (error) {
			throw error;
		}
	}
}
