import { BenefitRepository } from './repository/benefit.repository';
import { AccessModule } from './../access/access.module';
import { TierRepository } from './repository/tier.repository';
import { Module } from '@nestjs/common';
import { TierController } from './tier.controller';
import { TierService } from './tier.service';

@Module({
  imports : [AccessModule],
  controllers: [TierController],
  providers: [TierService,TierRepository,BenefitRepository]
})
export class TierModule {}
