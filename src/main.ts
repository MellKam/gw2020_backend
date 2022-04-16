import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { nodeEnv } from './types/node-env';
import { useContainer } from 'class-validator';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			disableErrorMessages: false,
		}),
	);
	useContainer(app.select(AppModule), { fallbackOnErrors: true });
	await app.listen(
		process.env.NODE_ENV === nodeEnv.production
			? process.env.LOCAL_APP_PORT
			: process.env.CONTAINER_APP_PORT,
		() =>
			// eslint-disable-next-line no-console
			console.log(
				`✅ Server started | Local = http://localhost:${process.env.LOCAL_APP_PORT}`,
			),
	);
}

bootstrap();
