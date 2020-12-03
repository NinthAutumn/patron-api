import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { ProjectAccessRepository } from './repository/project-access.repository';
import { AccessRepository } from './repository/access.repository';

@Module({
  imports: [],
  controllers: [AccessController],
  providers: [AccessService,ProjectAccessRepository, AccessRepository],
  exports: [AccessService]
})
export class AccessModule {}
