import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ProfilelinkEntity } from 'src/profilelinks/entities/profilelink.entity';

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string | null;

  @Exclude()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => ProfilelinkEntity, required: false })
  @IsOptional()
  profileLink?: ProfilelinkEntity;

  constructor({ profileLink, ...data }: Partial<UserEntity>) {
    Object.assign(this, data);

    if (profileLink) {
      this.profileLink = new ProfilelinkEntity(profileLink);
    }
  }
}
