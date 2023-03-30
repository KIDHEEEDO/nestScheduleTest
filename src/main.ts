import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const { port } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port || 3000);
}
bootstrap();
