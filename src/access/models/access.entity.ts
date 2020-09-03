import { arrayContains } from 'class-validator';

export class Access {
  id: number;
  site: boolean;
  name: string;
  setting: JSON;
}
