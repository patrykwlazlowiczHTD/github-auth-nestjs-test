import {Injectable} from '@nestjs/common';
import * as graphql from '@octokit/graphql';
import {_} from 'lodash';
import {PageInfo} from '../common/interfaces/PageInfo';

@Injectable()
export class PullRequestsService {
    constructor() {
    }

    async getPullRequestsPage(token: string, pageInfo: PageInfo): Promise<any> {
        return graphql(`query getPullRequests($cursor: String){
            viewer {
                pullRequests(first: 10, after: $cursor) {
                    pageInfo {
                        endCursor,
                        hasNextPage
                    }
                    edges {
                        node {
                            title
                            bodyText
                            createdAt
                            publishedAt
                            additions
                            deletions
                            changedFiles
                            repository {
                                name
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

    async getPullRequestsForLoggedUser(token: string): Promise<any> {
        const pullRequests = [];
        let pageInfo: PageInfo = {
            endCursor: null,
            hasNextPage: false,
        };
        do {
            const data = await this.getPullRequestsPage(token, pageInfo);
            pageInfo = {...data.viewer.pullRequests.pageInfo};
            pullRequests.push(...data.viewer.pullRequests.edges);
        } while (pageInfo.hasNextPage);
        return _.map(pullRequests, (edge) => {
            return {
                title: edge.node.title,
                bodyText: edge.node.bodyText,
                createdAt: edge.node.createdAt,
                publishedAt: edge.node.publishedAt,
                additions: edge.node.additions,
                deletions: edge.node.deletions,
                changedFiles: edge.node.changedFiles,
                repository: edge.node.repository,
            };
        });
    }
}
