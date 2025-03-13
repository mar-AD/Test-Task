import { HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../dtos/interfaces";

@Injectable()
export class JwtUtil {
  constructor(private readonly jwtService: JwtService) {}


  generateAccessToken (payload: JwtPayload): string  {
    console.log('generating access token...');
    try {
      const token = this.jwtService.sign(payload, { expiresIn: '2m' });
      console.log('Access token generated successfully.');
      return token;
    } catch (error) {
      console.error(`error generating access token: ${error}`);
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'feild to generate access token',
      });
    }
  }
}


