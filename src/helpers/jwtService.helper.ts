import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTService {
  constructor(private jwtService: JwtService) {}

  public signJWT(payload: {
    userId: string;
    email: string;
    phoneNumber: string;
    role: 'admin' | 'moderator' | 'student';
  }): string {
    return this.jwtService.sign(payload);
  }

  public generatePasswordResetToken(payload: { email: string }): string {
    return this.jwtService.sign(payload, {
      expiresIn: `${process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN}m`,
    });
  }

  public verifyJWT(accessToken: string): {
    userId: string;
    email: string;
    phoneNumber: string;
    role: string;
  } {
    return this.jwtService.verify(accessToken);
  }
}
