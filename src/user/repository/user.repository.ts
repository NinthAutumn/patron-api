import { User } from '../models/user.entity';
import { InjectSlonik, Slonik } from '../../slonik';
import { sql } from 'slonik';
import { UserSafeDTO } from '../dto/user-safe.dto';
import { UserSelfDTO } from '../dto/user-self.dto';

export class UserRepository extends User {
  constructor(@InjectSlonik() private readonly slonik: Slonik) {
    super();
  }
  async findUserByIdSelf(id: number): Promise<UserSelfDTO> {
    return this.slonik.one(sql`select * from fetch_user_self where id = ${id}`);
  }
  async findUserByIdSafe(id: number): Promise<UserSafeDTO> {
    return this.slonik.one(sql`select * from fetch_user_safe where id = ${id}`);
  }
}
