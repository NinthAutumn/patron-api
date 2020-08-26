import { Injectable, BadRequestException } from '@nestjs/common';
import { FindBank } from './functions/bank.function';
import { FindShop } from './functions/shop.functions';
import { QueryDTO } from './dto/query.dto';

@Injectable()
export class PayoutService {
  async findBank(queryDTO: QueryDTO) {
    try {
      const { query } = queryDTO;
      const result = FindBank(query);
      return result;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async findShop(queryDTO: QueryDTO) {
    try {
      const { query, bank } = queryDTO;
      const result = FindShop(query, bank);
      return result;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
