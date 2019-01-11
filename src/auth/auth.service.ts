import {Injectable} from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor() {
    }

    async validateUserBasic(token: string): Promise<any> {
        return token;
    }

    async validateUserGithub(payload: string): Promise<any> {
        // put some validation logic here
        // for example query user by id/email/username
        return {};
    }
}
