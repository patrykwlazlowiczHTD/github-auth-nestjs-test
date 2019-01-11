import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { Strategy } from 'passport-github';
import {_} from 'lodash';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CLIENT_CALLBACK } from '../../server.constants';

@Injectable()
export class GithubStrategy {
    constructor() {
        this.init();
    }

    private init(): void {
        use('github', new Strategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: GITHUB_CLIENT_CALLBACK,
        }, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
            const user = {
                token: null,
                githubProfile: null,
            };
            user.token = accessToken;
            user.githubProfile = _.omit(profile, ['_raw', '_json']);
            return done(null, user);
        }));
    }
}
