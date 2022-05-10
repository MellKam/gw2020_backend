import { nodeEnv } from './node-env';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: nodeEnv;
			APP_PORT: string;
			WEB_APP_URL?: string;
		}
	}
}
