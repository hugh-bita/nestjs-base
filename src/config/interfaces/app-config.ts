export interface AppConfig {
  port: number;

  auth: {
    jwt: {
      secret: string;
      expiresInSeconds: number;
    };
    twitter: {
      authorizeUrl: string;
      tokenUrl: string;
      profileUrl: string;
      oauth2ClientId: string;
      oauth2ClientSecret: string;
      oauth2ClientCodeVerifier: string;
      oauth2ClientCodeChallenge: string;
      oauth2ClientCodeChallengeMethod: string;
      callbackURL: string;
    };
  };
}
