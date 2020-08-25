import { TierRepository } from './repository/tier.repository';
import { Module } from '@nestjs/common';
import { TierController } from './tier.controller';
import { TierService } from './tier.service';

@Module({
  imports : [TierRepository],
  controllers: [TierController],
  providers: [TierService]
})
export class TierModule {}
