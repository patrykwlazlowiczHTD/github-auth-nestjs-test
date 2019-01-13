import {Injectable} from '@nestjs/common';
import {OwnRepositoriesService} from '../repositories/prodivers/github/repostories/own/own.repositories.service';
import {ContributedRepositoriesService} from '../repositories/prodivers/github/repostories/contributed/contributed.repositories.service';
import {PullRequestsService} from '../repositories/prodivers/github/pull-requests/pull.requests.service';

@Injectable()
export class AuthService {
    constructor(private readonly pullRequestsService: PullRequestsService,
                private readonly ownRepositoriesService: OwnRepositoriesService,
                private readonly contributedRepositoriesService: ContributedRepositoriesService) {
    }

    async validateUserBasic(token: string): Promise<any> {
        return token;
    }

    async getPullRequestsForLoggedUser(token: string): Promise<any> {
        return await this.pullRequestsService.getPullRequestsForLoggedUser(token);
    }

    async getRepositoriesForLoggedUser(token: string): Promise<any> {
        return await this.ownRepositoriesService.getRepositoriesForLoggedUser(token);
    }

    async getRepositoriesContributedToForLoggedUser(token: string): Promise<any> {
        return await this.contributedRepositoriesService.getRepositoriesContributedToForLoggedUser(token);
    }
}
