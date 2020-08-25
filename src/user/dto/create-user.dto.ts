import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(100)
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
