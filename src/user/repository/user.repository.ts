import { User } from '../models/user.entity';
import { Slonik,InjectSlonik } from '../../slonik';
import { sql } from 'slonik';
import { UserSafeDTO } from '../dto/user-safe.dto';
import { UserSelfDTO } from '../dto/user-self.dto';
import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import uuid from 'uuid';
@Injectable()
export class UserRepository {
  constructor(@InjectSlonik() private readonly slonik: Slonik) {}

  findUserByIdSelf(id: number): Promise<UserSelfDTO> {
    return this.slonik.one(sql`select * from fetch_user_self where id = ${id}`);
  }
  findUserByIdSafe(id: number): Promise<UserSafeDTO> {
    return this.slonik.one(sql`select * from fetch_user_safe where id = ${id}`);
  }
  findUserByCredential(credentials: string): Promise<UserSelfDTO> {
    return this.slonik.maybeOne(
      sql`select * from fetch_user_self where (username=${credentials} or email = ${credentials})`,
    );
  }
  async create(createUserDTO: CreateUserDTO): Promise<number> {
    const { username, password, email } = createUserDTO;
    const user = await this.slonik.maybeOne(
      sql`select * from users where lower(username) = lower(${username}) or lower(email) = lower(${email})`,
    );
    if (user) {
      throw new ConflictException(
        '指定されたユーザー名またはメールアドレスがもう使われています',
      );
    }
    await this.slonik
      .one(sql`insert into users (username,password,email,verified,gender,first_name,last_name,created_at,updated_at)
               values(${username},${password},${email},false,'other','','',now(),now()) returning id
  `);
    return;
  }

  async updateRefreshToken(id: number): Promise<string> {
    let token = uuid();
    await this.slonik.query(
      sql`update users set refresh_token  = ${token} where id = ${id}`,
    );
    return token;
  }
  async verifyUser(id: number) {
    await this.slonik.query(sql`udpate users set verify=true where id = ${id}`);
  }
}
