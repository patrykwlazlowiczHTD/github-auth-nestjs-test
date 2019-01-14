import {Injectable} from '@nestjs/common';
import * as graphql from '@octokit/graphql';
import {_} from 'lodash';
import {PageInfo} from '../../common/interfaces/PageInfo';

@Injectable()
export class OwnRepositoriesService {
    constructor() {
    }

    async getRepositoriesPage(token: string, privacyPolicy: string, pageInfo: PageInfo): Promise<any> {
        return graphql(`query getPageOwnedRepositories($cursor: String, $privacyPolicy: RepositoryPrivacy){
            viewer {
                repositories(first: 10,
                             after: $cursor,
                             privacy: $privacyPolicy,
                             affiliations: [ORGANIZATION_MEMBER, COLLABORATOR, OWNER],
                             ownerAffiliations: [ORGANIZATION_MEMBER, COLLABORATOR, OWNER]) {
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
            privacyPolicy,
            headers: {
                authorization: `token ${token}`,
            },
        });
    }

    async getRepositoriesForLoggedUserWithPrivacy(token: string, privacy: string): Promise<any> {
        const repositories = [];
        let pageInfo: PageInfo = {
            endCursor: null,
            hasNextPage: false,
        };
        do {
            const data = await this.getRepositoriesPage(token, privacy, pageInfo);
            pageInfo = {...data.viewer.repositories.pageInfo};
            repositories.push(...data.viewer.repositories.edges);
        } while (pageInfo.hasNextPage);
        return repositories;
    }

    async getRepositoriesForLoggedUser(token: string): Promise<any> {
        const repositories = [];
        repositories.push(... await this.getRepositoriesForLoggedUserWithPrivacy(token, 'PUBLIC'));
        repositories.push(... await this.getRepositoriesForLoggedUserWithPrivacy(token, 'PRIVATE'));
        return _.map(repositories, (repository) => {
            return {
                name: repository.node.name,
                commits: _.map(repository.node.ref.target.history.edges, 'node.messageHeadline'),
            };
        });
    }
}
