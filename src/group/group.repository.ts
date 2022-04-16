import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Group, GroupDocument } from './schemas/group.schema';

@Injectable()
export class GroupRepository extends EntityRepository<GroupDocument> {
	constructor(@InjectModel('Group') groupModel: Model<GroupDocument>) {
		super(groupModel);
	}
}
