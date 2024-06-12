import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ProfileLink } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
