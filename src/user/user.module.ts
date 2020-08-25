import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [UserRepository],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
