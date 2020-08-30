import { IsNotEmpty, MinLength } from 'class-validator';

export class LocalLoginDTO {
  @IsNotEmpty()
  credential: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
