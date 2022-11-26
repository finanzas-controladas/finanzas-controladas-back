import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from '../users/user.providers';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRE,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [...userProviders, JwtStrategy, AuthService],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}