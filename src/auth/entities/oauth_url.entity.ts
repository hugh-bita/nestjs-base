import { ApiProperty } from '@nestjs/swagger';

export class OAuthUrlEntity {
  @ApiProperty()
  url: string;
  constructor({ ...url }: Partial<OAuthUrlEntity>) {
    Object.assign(this, url);
  }
}
