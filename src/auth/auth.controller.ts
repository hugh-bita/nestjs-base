import {
  Controller,
  Get,
  Query,
  Redirect,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { OAuthUrlEntity } from './entities/oauth_url.entity';
import { TwitterStrategy } from './strategies/twitter/twitter.strategy';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('oauth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly twitterStrategy: TwitterStrategy,
    private readonly configService: ConfigService,
  ) {}

  @Get('twitter/url')
  @ApiOkResponse({ type: OAuthUrlEntity })
  getTwitterOauthUrl() {
    const rootUrl = this.configService.get<string>('auth.twitter.authorizeUrl');
    const redirectUri = this.configService.get<string>(
      'auth.twitter.callbackURL',
    );
    const oauthClientId = this.configService.get<string>(
      'auth.twitter.oauth2ClientId',
    );
    const oauth2ClientCodeChallenge = this.configService.get<string>(
      'auth.twitter.oauth2ClientCodeChallenge',
    );
    const oauth2ClientCodeChallengeMethod = this.configService.get<string>(
      'auth.twitter.oauth2ClientCodeChallengeMethod',
    );
    const options = {
      redirect_uri: redirectUri,
      client_id: oauthClientId,
      state: 'state',
      response_type: 'code',
      code_challenge: oauth2ClientCodeChallenge,
      code_challenge_method: oauth2ClientCodeChallengeMethod,
      scope: ['users.read', 'tweet.read', 'follows.read', 'follows.write'].join(
        ' ',
      ), // add/remove scopes as needed
    };
    const qs = new URLSearchParams(options).toString();
    return new OAuthUrlEntity({ url: `${rootUrl}?${qs}` });
  }

  @Get('twitter')
  @Redirect('http://www.localhost:3000')
  async twitterOauth(req: Request, res: Response, @Query('code') code: string) {
    // const code = req.query.code; // getting the code if the user authorized the app
    console.log(code);

    // 1. get the access token with the code
    const twitterOAuthToken =
      await this.twitterStrategy.getTwitterOAuthToken(code);

    if (!twitterOAuthToken) {
      // redirect if no auth token
    }

    // 2. get the twitter user using the access token
    const twitterUser = await this.twitterStrategy.getTwitterUser(
      twitterOAuthToken.access_token,
    );

    if (!twitterUser) {
      // redirect if no twitter user
    }

    // 3. upsert the user in our db
    const user = await this.usersService.createOrUpdate({
      twitterId: twitterUser.id,
      username: twitterUser.username,
      fullName: twitterUser.name,
      password: ""
    })

    console.log(user);
    

    // 4. create cookie so that the server can validate the user

    // 5. finally redirect to the client

    return;
  }
}
