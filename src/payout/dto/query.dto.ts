import { MinLength } from 'class-validator';

export class QueryDTO {
  @MinLength(1)
  query: string;

  bank?: string;
}
