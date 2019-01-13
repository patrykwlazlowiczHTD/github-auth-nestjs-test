import {Module} from '@nestjs/common';
import {authenticate} from 'passport';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {HttpStrategy} from './strategies/http.strategy';
import {GithubStrategy} from './strategies/github.strategy';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {LoggingInterceptor} from '../interceptors/logging.interceptor';
import {OwnRepositoriesService} from '../repositories/prodivers/github/repostories/own/own.repositories.service';
import {ContributedRepositoriesService} from '../repositories/prodivers/github/repostories/contributed/contributed.repositories.service';
import {PullRequestsService} from '../repositories/prodivers/github/pull-requests/pull.requests.service';

@Module({
    controllers: [AuthController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        OwnRepositoriesService,
        ContributedRepositoriesService,
        PullRequestsService,
        AuthService,
        HttpStrategy,
        GithubStrategy,
    ],
})
export class AuthModule {
}
