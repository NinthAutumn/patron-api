import { IsNotEmpty, MinLength } from 'class-validator';

export class LocalLoginDTO {
  @IsNotEmpty({message:"Eメール・ユーザ名は必要項目です"})
  credential: string;

  @IsNotEmpty({message:"パスワードは必要項目です"})
  @MinLength(6,{message:"パスワードは最低６字必要です"})
  password: string;
}
