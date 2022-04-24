import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AppReq } from '../../types/request';

export const DbSession = createParamDecorator(
	(_data: string, ctx: ExecutionContext) => {
		const request: AppReq = ctx.switchToHttp().getRequest();
		const session = request.dbSession;

		return session ?? undefined;
	},
);
