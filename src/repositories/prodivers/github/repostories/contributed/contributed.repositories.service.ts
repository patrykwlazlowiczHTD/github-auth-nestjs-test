import {Injectable} from '@nestjs/common';
import * as graphql from '@octokit/graphql';
import {_} from 'lodash';
import {PageInfo} from '../../common/interfaces/PageInfo';

@Injectable()
export class ContributedRepositoriesService {
    constructor() {
    }

    async getRepositoriesContributedToPage(token: string, pageInfo: PageInfo): Promise<any> {
        return graphql(`query getRepositoriesContributedTo($cursor: String){
            viewer {
                repositoriesContributedTo(first: 10, after: $cursor) {
                    pageInfo {
                        endCursor,
                        hasNextPage
                    }
                    edges {
                        node {
                            name
                            ref(qualifiedName: "master") {
                                target {
                                    ... on Commit {
                                        history(first: 100) {
                                            edges {
                                                node {
                                                    messageHeadline
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }`, {
            cursor: pageInfo.endCursor,
            headers: {
                authorization: `token ${token}`,
            },
        });
    }

    async getRepositoriesContributedToForLoggedUser(token: string): Promise<any> {
        const repositories = [];
        let pageInfo: PageInfo = {
            endCursor: null,
            hasNextPage: false,
        };
        do {
            const data = await this.getRepositoriesContributedToPage(token, pageInfo);
            pageInfo = {...data.viewer.repositoriesContributedTo.pageInfo};
            repositories.push(...data.viewer.repositoriesContributedTo.edges);
        } while (pageInfo.hasNextPage);
        return _.map(repositories, (repository) => {
            return {
                name: repository.node.name,
                commits: _.map(repository.node.ref.target.history.edges, 'node.messageHeadline')
            };
        });
    }
}
