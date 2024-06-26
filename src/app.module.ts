import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProfilelinksModule } from './profilelinks/profilelinks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PrismaModule,
    UsersModule,
    ProfilelinksModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
