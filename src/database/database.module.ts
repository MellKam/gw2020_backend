import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					uri: configService.get<string>('MONGOOSE_URI'),
				};
			},
		}),
	],
	providers: [DatabaseService],
	exports: [DatabaseService],
})
export class DatabaseModule {}
