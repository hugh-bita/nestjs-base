import { AppConfig } from "./interfaces/app-config";

export default (): AppConfig => ({
	port: parseInt(process.env.PORT) || 5000,

	auth: {
		jwt: {
			secret: process.env.JWT_SECRET,
			expiresInSeconds: parseInt(process.env.JWT_EXPIRATION_TIME_SECONDS) || 900,
		},
		twitter: {
			consumerKey: process.env.TWITTER_CONSUMER_KEY,
			consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
			callbackURL: process.env.TWITTER_CALLBACK_URL,
		},
	},
});