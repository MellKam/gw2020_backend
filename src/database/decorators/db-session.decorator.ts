import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ReqWithMongoSession } from '../../types/request';

export const DbSession = createParamDecorator(
	(_data: string, ctx: ExecutionContext) => {
		const request: ReqWithMongoSession = ctx.switchToHttp().getRequest();
		const session = request.dbSession;

		return session ?? undefined;
	},
);
