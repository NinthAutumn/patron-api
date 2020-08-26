import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { CreatorAccessRepository } from './repository/creator-access.repository';
import { AccessRepository } from './repository/access.repository';

@Module({
  imports: [CreatorAccessRepository, AccessRepository],
  controllers: [AccessController],
  providers: [AccessService],
  exports: [AccessService]
})
export class AccessModule {}
