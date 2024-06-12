import { Injectable } from '@nestjs/common';
import { CreateProfilelinkDto } from './dto/create-profilelink.dto';
import { UpdateProfilelinkDto } from './dto/update-profilelink.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfilelinksService {
  constructor(private prisma: PrismaService) {}
  
  create(createProfilelinkDto: CreateProfilelinkDto) {
    return this.prisma.profileLink.create({ data: createProfilelinkDto });
  }

  findAll() {
    return this.prisma.profileLink.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} profilelink`;
  }

  update(id: number, updateProfilelinkDto: UpdateProfilelinkDto) {
    return `This action updates a #${id} profilelink`;
  }

  remove(id: number) {
    return `This action removes a #${id} profilelink`;
  }
}
