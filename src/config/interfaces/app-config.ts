export interface AppConfig {
	port: number

	auth: {
		jwt: {
			secret: string
			expiresInSeconds: number
		}
		twitter: {
			consumerKey: string
      consumerSecret: string
      callbackURL: string
		}
	}
}