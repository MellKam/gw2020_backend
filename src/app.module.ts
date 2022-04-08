import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
// import { GroupModule } from './group/group.module';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: '.env' }),
		MongooseModule.forRoot(process.env.MONGOOSE_URI),
		StudentModule,
		// GroupModule,
	],
})
export class AppModule {}
