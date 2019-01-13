import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import { json, urlencoded } from 'body-parser';
import * as morgan from 'morgan';
import { APP_PORT } from './server.constants';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    app.use(morgan('dev'));
    app.use(json());
    app.use(urlencoded({ extended: true }));
    await app.listen(process.env.PORT || APP_PORT, '0.0.0.0');
}
bootstrap();
