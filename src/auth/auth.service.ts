import {Injectable} from '@nestjs/common';
import * as graphql from '@octokit/graphql';
import {_} from 'lodash';

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

    async getRepositopriesForLoggedUser(token: string): Promise<any> {
        const data = await graphql(`{
            viewer {
                repositories(first: 100) {
                    edges {
                        node {
                            name
                        }
                    }
                }
            }
        }`, {
            headers: {
                authorization: `token ${token}`,
            },
        });
        return _.map(data.viewer.repositories.edges, 'node.name');
    }
}
