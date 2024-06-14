import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  constructor(data: Partial<CreateUserDto>) {
    Object.assign(this, data);
  }

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  fullName: string;

  @IsString()
  @ApiProperty()
  twitterId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
