import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(id: number, safe: boolean) {
    return safe
      ? this.userRepository.findUserByIdSafe(id)
      : this.userRepository.findUserByIdSelf(id);
  }
}
