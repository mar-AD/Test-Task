import { Body, Controller, Get, Post, UseGuards, ValidationPipe, Req  } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body(ValidationPipe) userDto: LoginDto) {
        return this.authService.login(userDto);
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    getProfile(@Req() req: Request) {
        const userId = req['user'].id
        return this.authService.getProfile(userId);
    }
}