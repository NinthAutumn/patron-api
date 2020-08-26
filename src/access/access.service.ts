import { Injectable } from '@nestjs/common';
import { AccessRepository } from './repository/access.repository';
import { Access } from './models/access.entity';

@Injectable()
export class AccessService {
    constructor(private readonly accessRepository: AccessRepository){}

    findAccessByUserID(user_id: number): Promise<Access>{
        return this.accessRepository.findByUserID(user_id);
    }

    
}
