export interface TwitterTokenResponse {
  token_type: 'bearer';
  expires_in: 7200;
  access_token: string;
  scope: string;
}
export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  description: string;
  profile_image_url: string;
}