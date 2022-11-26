import { Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
})
export class UsersModule {}