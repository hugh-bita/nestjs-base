// import { ExtractJwt, Strategy } from 'passport-jwt';
import { Profile, Strategy } from 'passport-twitter'
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(
    private readonly configService: ConfigService
  ) {
    const consumerKey = configService.get<string>('consumerKey');
    const consumerSecret = configService.get<string>('consumerSecret');
    const callbackURL = configService.get<string>('callbackURL');
    if (!consumerKey || !consumerSecret || !callbackURL) {
      throw new Error('Missing Twitter credentials');
    }

    super({ 
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
      callbackURL: callbackURL,
      includeEmail: true
    });
  }

  async validate(token: string, secret: string, profile: Profile) {
    return {
      provider: "twitter",
      username: profile.username,
    };
  }
}