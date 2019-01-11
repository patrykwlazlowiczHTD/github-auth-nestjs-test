import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {HttpStrategy} from './strategies/http.strategy';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {LoggingInterceptor} from './interceptors/logging.interceptor';

@Module({
    controllers: [AuthController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        AuthService,
        HttpStrategy,
    ],
})
export class AuthModule {
}
