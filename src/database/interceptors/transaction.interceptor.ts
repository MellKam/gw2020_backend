import {
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	Injectable,
} from '@nestjs/common';
import { Observable, tap, catchError } from 'rxjs';
import { ReqWithMongoSession } from '../../types/request';
import { DatabaseService } from '../database.service';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
	constructor(private readonly databaseService: DatabaseService) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<any>> {
		const request: ReqWithMongoSession = context.switchToHttp().getRequest();
		const connection = this.databaseService.connection;

		const session = await connection.startSession();
		request.dbSession = session;
		session.startTransaction();

		return next.handle().pipe(
			tap(async () => {
				await session.commitTransaction();
				session.endSession();
			}),
			catchError(async (err) => {
				await session.abortTransaction();
				session.endSession();
				throw err;
			}),
		);
	}
}
