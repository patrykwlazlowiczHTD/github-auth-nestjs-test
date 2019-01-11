import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get('basic')
    @UseGuards(AuthGuard('bearer'))
    findAllBasic(@Req() request) {
        return JSON.stringify({
            type: 'basic',
            authorization: request.headers.authorization,
            user: request.user,
        }) + '\n';
    }
}
