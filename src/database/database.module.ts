import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { TransactionInterceptor } from './interceptors/transaction.interceptor';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>('MONGOOSE_URI'),
			}),
		}),
	],
	providers: [DatabaseService, TransactionInterceptor],
	exports: [DatabaseService],
})
export class DatabaseModule {}
