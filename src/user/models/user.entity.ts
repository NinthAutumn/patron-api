import { login_strategy, gender_type } from './../user.enums';
export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  verified: boolean;
  social_id: string;
  strategy: login_strategy;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: gender_type;
  created_at: string;
  updated_at: string;
}
