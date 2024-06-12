import { PartialType } from '@nestjs/swagger';
import { CreateProfilelinkDto } from './create-profilelink.dto';

export class UpdateProfilelinkDto extends PartialType(CreateProfilelinkDto) {}
