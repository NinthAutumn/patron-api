import { gender_type, login_strategy } from '../user.enums';
import { Exclude } from 'class-transformer';
export class UserSelfDTO {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  strategy: login_strategy;
  social_id: string;
  gender: gender_type;
  created_at: string;
  updated_at: string;
  verified: Boolean;

  @Exclude()
  password: string;
}
