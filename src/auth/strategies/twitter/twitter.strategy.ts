import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { TwitterTokenResponse, TwitterUser } from 'src/auth/interfaces/twitter';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TwitterStrategy {
  private tokenUrl: string;
  private profileUrl: string;
  private twitterOauthTokenParams: any;
  private basicAuthToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const tokenUrl = this.configService.get<string>('auth.twitter.tokenUrl');
    const profileUrl = this.configService.get<string>(
      'auth.twitter.profileUrl',
    );
    const redirectUri = this.configService.get<string>(
      'auth.twitter.callbackURL',
    );
    const oauth2ClientId = this.configService.get<string>(
      'auth.twitter.oauth2ClientId',
    );
    const oauth2ClientSecret = this.configService.get<string>(
      'auth.twitter.oauth2ClientSecret',
    );
    const oauth2ClientCodeVerifier = this.configService.get<string>(
      'auth.twitter.oauth2ClientCodeVerifier',
    );
    const oauth2ClientCodeChallenge = this.configService.get<string>(
      'auth.twitter.oauth2ClientCodeChallenge',
    );
    const oauth2ClientCodeChallengeMethod = this.configService.get<string>(
      'auth.twitter.oauth2ClientCodeChallengeMethod',
    );
    const basicAuthToken = Buffer.from(
      `${oauth2ClientId}:${oauth2ClientSecret}`,
      'utf8',
    ).toString('base64');
    const twitterOauthTokenParams = {
      client_id: oauth2ClientId,
      code_verifier: oauth2ClientCodeVerifier,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    };

    if (
      !tokenUrl ||
      !redirectUri ||
      !oauth2ClientId ||
      !oauth2ClientCodeChallenge ||
      !oauth2ClientCodeChallengeMethod ||
      !oauth2ClientSecret ||
      !basicAuthToken
    ) {
      throw new Error('Missing Twitter credentials');
    }

    this.tokenUrl = tokenUrl;
    this.profileUrl = profileUrl;
    this.basicAuthToken = basicAuthToken;
    this.twitterOauthTokenParams = twitterOauthTokenParams;
  }

  async getTwitterOAuthToken(code: string) {
    try {
      // POST request to the token url to get the access token
      const res = await firstValueFrom(
        this.httpService.post<TwitterTokenResponse>(
          this.tokenUrl,
          new URLSearchParams({
            ...this.twitterOauthTokenParams,
            code,
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${this.basicAuthToken}`,
            },
          },
        ),
      );
      return res.data;
    } catch (err) {
      // Handle any errors
      console.error(err);
      throw new UnauthorizedException('Can not get Twitter OAuth Token');
    }
  }

  async getTwitterUser(accessToken: string): Promise<TwitterUser | null> {
    try {
      const params = {
        'user.fields':
          'created_at,description,id,location,name,profile_image_url,url,username,verified',
      };
      const qs = new URLSearchParams(params).toString();
      const res = await firstValueFrom(
        this.httpService.get(this.profileUrl + '?' + qs, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );
      return res.data.data ?? null;
    } catch (err) {
      return null;
    }
  }
}
