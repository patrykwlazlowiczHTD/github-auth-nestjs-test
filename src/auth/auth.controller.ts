import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get()
    login(@Req() request, @Res() response) {
        return response.redirect('/auth/github');
    }

    @Get('github')
    @UseGuards(AuthGuard('github'))
    signInWithGithub(){
        return 'Logging...';
    }

    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    async signInWithGithubCallback(@Req() request){
        const user = request.user;
        user.githubProfile.pullRequests = await this.authService.getPullRequestsForLoggedUser(user.token);
        user.githubProfile.ownRepositories = await this.authService.getRepositoriesForLoggedUser(user.token);
        user.githubProfile.contributedRepositories = await this.authService.getRepositoriesContributedToForLoggedUser(user.token);
        return user;
    }

    @Get('basic')
    @UseGuards(AuthGuard('bearer'))
    signInWithHttpBearer(@Req() request) {
        return JSON.stringify({
            type: 'basic',
            authorization: request.headers.authorization,
            user: request.user,
        }) + '\n';
    }
}
