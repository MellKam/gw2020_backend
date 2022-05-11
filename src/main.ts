import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			disableErrorMessages: false,
			transform: true,
		}),
	);
	app.enableCors({ origin: process.env.WEB_APP_URL, credentials: true });
	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	await app.listen(process.env.APP_PORT, () =>
		// eslint-disable-next-line no-console
		console.log(
			`✅ Server started on http://localhost:${process.env.APP_PORT}`,
		),
	);
}

bootstrap();
