import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfilelinksService } from './profilelinks.service';
import { CreateProfilelinkDto } from './dto/create-profilelink.dto';
import { UpdateProfilelinkDto } from './dto/update-profilelink.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ProfilelinkEntity } from './entities/profilelink.entity';

@Controller('profilelinks')
@ApiTags('ProfileLinks')
export class ProfilelinksController {
  constructor(private readonly profilelinksService: ProfilelinksService) {}

  @Post()
  create(@Body() createProfilelinkDto: CreateProfilelinkDto) {
    return this.profilelinksService.create(createProfilelinkDto);
  }

  @Get()
  findAll() {
    return this.profilelinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilelinksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfilelinkDto: UpdateProfilelinkDto,
  ) {
    return this.profilelinksService.update(+id, updateProfilelinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilelinksService.remove(+id);
  }
}
