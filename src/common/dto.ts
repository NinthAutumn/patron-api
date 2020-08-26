import { Transform } from 'class-transformer';

export class PaginationDTO {
  @Transform(limit => parseInt(limit), { toClassOnly: true })
  limit: number;

  @Transform(page => (parseInt(page) - 1) * parseInt(this.limit), {
    toClassOnly: true,
  })
  page: number;
}
