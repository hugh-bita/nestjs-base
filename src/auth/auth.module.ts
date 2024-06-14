import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TwitterStrategy } from './strategies/twitter/twitter.strategy';
import { UsersService } from 'src/users/users.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ConfigModule, HttpModule, PrismaModule],
  providers: [AuthService, TwitterStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
