import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findOne(id: number, safe: boolean) {
    return safe
      ? await this.userRepository.findUserByIdSafe(id)
      : await this.userRepository.findUserByIdSelf(id);
  }

  async setRefreshToken(id: number) {
    return await this.userRepository.updateRefreshToken(id);
  }
  async verifyUser(id: number) {
    return this.userRepository.verifyUser(id);
  }
  async createUser(createUserDTO: CreateUserDTO) {
    return this.userRepository.create(createUserDTO);
  }
}
