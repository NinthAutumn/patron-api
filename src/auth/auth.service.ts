import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LocalLoginDTO } from './dto/local-login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.entity';
import { UserService } from '../user/user.service';
import { VerifyUserDTO } from './dto/verify-user.dto';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { create } from 'domain';
import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async localLogin(localLoginDTO: LocalLoginDTO) {
    const { credential, password } = localLoginDTO;
    console.log(localLoginDTO);
    return 
    const user = await this.userService.findOneUserByCredential(credential);
    if (!user) {
      throw new UnauthorizedException(
        `入力されたパスワードまたはユーザー名・Eメールが間違っています`,
      );
    }
    if (await this.verifyPassword(password, user.password)) {
      return await this.createAuthTokens(user.id);
    } else {
      throw new UnauthorizedException(
        `入力されたパスワードまたはユーザー名・Eメールが間違っています`,
      );
    }
  }
  async createJWTToken(payload: any, time: number = 100000) {
    // console.log(process.env.JWT_SECRET);
    return await this.jwtService.sign(payload, {
      expiresIn: time,
    });
  }

  verifyPassword(password: string, hashed_password: string): Promise<Boolean> {
    return compare(password, hashed_password);
  }
  async hashPassword(password) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
  async createAuthTokens(id: number) {
    const access_token = await this.createJWTToken({ id: id });
    const refresh_token = await this.userService.setRefreshToken(id);
    return { access_token, refresh_token };
  }

  async localSignUp(createUserDTO: CreateUserDTO) {
    try {
      const { password } = createUserDTO;
      createUserDTO.password = await this.hashPassword(password);
      const user_id = await this.userService.createUser(createUserDTO);
      return this.createAuthTokens(user_id);
    } catch (error) {}
  }

  async verifyUser(verifyDTO: VerifyUserDTO) {
    try {
      const { token } = verifyDTO;
      const user = this.jwtService.verify(token);
      if (!user.verify) return { error: 'Please send a proper Token' };
      await this.userService.verifyUser(user.id);
      return this.createAuthTokens(user.id);
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }
}
