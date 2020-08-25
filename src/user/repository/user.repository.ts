import { User } from '../models/user.entity';
import { InjectSlonik, Slonik } from '../../slonik';
import { sql } from 'slonik';
import { UserSafeDTO } from '../dto/user-safe.dto';
import { UserSelfDTO } from '../dto/user-self.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';

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
  create(createUserDTO: CreateUserDTO): Promise<number> {
    const { username, password, email } = createUserDTO;
    return this.slonik
      .one(sql`insert into users (username,password,email,verified,gender,first_name,last_name,created_at,updated_at)
                 values(${username},${password},${email},false,'other','','',now(),now()) returning id
    `);
  }
}
