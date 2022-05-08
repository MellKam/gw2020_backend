import { nodeEnv } from './node-env';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: nodeEnv;
			LOCAL_APP_PORT: string;
			CONTAINER_APP_PORT?: string;
			WEB_APP_URL?: string;
			IS_LOCAL?: string;
		}
	}
}
