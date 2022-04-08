import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { nodeEnv } from './utils/node-env';
import { useContainer } from 'class-validator';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			disableErrorMessages: process.env.NODE_ENV === nodeEnv.production,
		}),
	);
	useContainer(app.select(AppModule), { fallbackOnErrors: true });
	await app.listen(process.env.PORT, () =>
		console.log(`✅ Server started: http://localhost:${process.env.PORT}`),
	);
}
bootstrap();
