import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Db, Collection, ObjectId } from 'mongodb';
import { Student } from '../student/schemas/student.schema';
import { Group } from '../group/schemas/group.schema';
import { Faculty } from '../faculty/faculty.schema';
import { Specification } from '../specification/specification.schema';

@Injectable()
export class DatabaseService {
	private readonly database: Db;
	private readonly studentCollection: Collection<Student>;
	private readonly groupCollection: Collection<Group>;
	private readonly facultyCollection: Collection<Faculty>;

	constructor(@InjectConnection() private readonly connection: Connection) {
		this.database = this.connection.db;
		this.studentCollection = this.database.collection('students');
		this.groupCollection = this.database.collection('groups');
		this.facultyCollection = this.database.collection('faculties');
	}

	async deleteStudetsByIds(ids: ObjectId[]) {
		try {
			return await this.studentCollection.deleteMany({ _id: { $in: ids } });
		} catch (error) {
			throw error;
		}
	}

	private async deleteGroupsByIds(ids: ObjectId[]) {
		try {
			return await this.groupCollection.deleteMany({ _id: { $in: ids } });
		} catch (error) {
			throw error;
		}
	}

	// Delete related documents(Groups and Students) to specification by specification id
	async deleteRelatedToSpecification(specifcationId: string): Promise<void> {
		try {
			this.groupCollection
				.find({ specification: new ObjectId(specifcationId) })
				.toArray(async (error, groups) => {
					if (error) throw error;

					await this.deleteGroupsAndStudentsByGroups(groups);
				});
		} catch (error) {
			throw error;
		}
	}

	private async deleteGroupsAndStudentsByGroups(groups: Group[]) {
		const groupIds: ObjectId[] = [];
		const studentIds: ObjectId[] = [];

		groups.forEach((group) => {
			if (group.students.length) {
				studentIds.push(...group.students);
			}
			groupIds.push(group._id);
		});

		await this.deleteGroupsByIds(groupIds);
		await this.deleteStudetsByIds(studentIds);
	}

	private async deleteRelatedToSpecifications(specificationIds: ObjectId[]) {
		try {
			this.groupCollection
				.find({ specification: { $in: specificationIds } })
				.toArray(async (error, groups) => {
					if (error) throw error;

					await this.deleteGroupsAndStudentsByGroups(groups);
				});
		} catch (error) {
			throw error;
		}
	}

	async deleteRelatedToFaculty(specifcations: Specification[]) {
		const specificationIds = specifcations.reduce((accum, specification) => {
			if (specification.groupsNumber) {
				accum.push(specification._id);
			}
			return accum;
		}, [] as ObjectId[]);

		if (specificationIds.length) {
			await this.deleteRelatedToSpecifications(specificationIds);
		}
	}

	/**
	 * Faculty Collection
	 */

	async decrementSpecificationGroupsNumber(specificationId: ObjectId) {
		try {
			await this.facultyCollection.updateOne(
				{ specifications: { $elemMatch: { _id: specificationId } } },
				{ $inc: { 'specifications.$.groupsNumber': -1 } },
			);
		} catch (error) {
			throw error;
		}
	}

	async incrementSpecificationGroupsNumber(specifcationId: ObjectId) {
		try {
			await this.facultyCollection.updateOne(
				{ specifications: { $elemMatch: { _id: specifcationId } } },
				{ $inc: { 'specifications.$.groupsNumber': 1 } },
			);
		} catch (error) {
			throw error;
		}
	}
}
