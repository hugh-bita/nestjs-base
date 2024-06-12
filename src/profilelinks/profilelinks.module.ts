import { Module } from '@nestjs/common';
import { ProfilelinksService } from './profilelinks.service';
import { ProfilelinksController } from './profilelinks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProfilelinksController],
  providers: [ProfilelinksService],
  imports: [PrismaModule],
})
export class ProfilelinksModule {}
