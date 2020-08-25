import { gender_type } from '../user.enums';

export class UserSafeDTO {
  id: number;
  username: string;
  gender: gender_type;
  created_at: string;
  updated_at: string;
  verified: Boolean;
}
