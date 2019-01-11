import {Module} from '@nestjs/common';
import {authenticate} from 'passport';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {HttpStrategy} from './strategies/http.strategy';
import {GithubStrategy} from './strategies/github.strategy';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {LoggingInterceptor} from '../interceptors/logging.interceptor';

@Module({
    controllers: [AuthController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        AuthService,
        HttpStrategy,
        GithubStrategy,
    ],
})
export class AuthModule {
}
