import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FetchUserResponse, JwtPayload, LoginResponse } from './dtos/interfaces';
import { JwtUtil } from './utils/jwt.token';
import { LoginDto } from './dtos/login.dto';
import { verifyPassword } from './utils/hash.pass';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtToken: JwtUtil,
    ) {}


    async login(userDto: LoginDto): Promise<LoginResponse> {
        const { email, password } = userDto;
    
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        try {
            const payload: JwtPayload = { id: user.id, email: user.email };
            const token = this.jwtToken.generateAccessToken(payload);
            
            return { access_token: token };
        } catch (error) {
            throw new InternalServerErrorException('Failed to generate token');
        }
    }
    
    
    async getProfile(userId: string): Promise<FetchUserResponse> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        return {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        };
    }


}
