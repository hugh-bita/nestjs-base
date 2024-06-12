import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, UsersModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
