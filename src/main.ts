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
	app.enableCors({ origin: process.env.WEB_APP_URL, credentials: true });
	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	await app.listen(
		process.env.NODE_ENV === nodeEnv.development
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
