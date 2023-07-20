import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
  constructor() {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const isValidUser =
      username === process.env.BASIC_AUTH_USER &&
      password === process.env.BASIC_AUTH_PASSWORD;

    if (!isValidUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { username };
  }
}
