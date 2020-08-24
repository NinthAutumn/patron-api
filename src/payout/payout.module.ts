import { Module } from '@nestjs/common';
import { PayoutController } from './payout.controller';

@Module({
  controllers: [PayoutController]
})
export class PayoutModule {}
