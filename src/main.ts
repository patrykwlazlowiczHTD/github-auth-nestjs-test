import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import { json, urlencoded } from 'body-parser';
import { initialize, session } from 'passport';
import { APP_PORT } from './server.constants';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    await app.listen(process.env.PORT || APP_PORT, '0.0.0.0');
}
bootstrap();
