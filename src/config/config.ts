import { AppConfig } from './interfaces/app-config';

export default (): AppConfig => ({
  port: parseInt(process.env.PORT) || 5000,

  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresInSeconds:
        parseInt(process.env.JWT_EXPIRATION_TIME_SECONDS) || 900,
    },
    twitter: {
      authorizeUrl: process.env.TWITTER_AUTHORIZE_URL,
      tokenUrl: process.env.TWITTER_TOKEN_URL,
      profileUrl: process.env.TWITTER_PROFILE_URL,
      oauth2ClientId: process.env.TWITTER_OAUTH2_CLIENT_ID,
      oauth2ClientSecret: process.env.TWITTER_OAUTH2_CLIENT_SECRET,
      oauth2ClientCodeVerifier: process.env.TWITTER_OAUTH2_CODE_VERIFIER,
      oauth2ClientCodeChallenge: process.env.TWITTER_OAUTH2_CODE_CHALLENGE,
      oauth2ClientCodeChallengeMethod:
        process.env.TWITTER_OAUTH2_CODE_CHALLENGE_METHOD,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
    },
  },
});
