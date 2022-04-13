export class CreateMockModel {
	constructor(entityData: unknown) {
		this.constructorSpy(entityData);
		return entityData as CreateMockModel;
	}

	constructorSpy(_entityData: unknown) {
		// spy on constructor
	}
}
