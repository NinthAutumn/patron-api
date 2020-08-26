import { InjectSlonik } from './../../slonik/inject-slonik.decorator';
import { Slonik } from './../../../dist/slonik/interfaces/slonik.interface.d';
import { Injectable } from "@nestjs/common";
import { CreatorAccess } from '../models/creator-access.entity';
import { sql } from 'slonik';

@Injectable()
export class CreatorAccessRepository {
    constructor(@InjectSlonik() private readonly slonik: Slonik) {}
    
    findByUserId(user_id: number): Promise<CreatorAccess>{
        return this.slonik.maybeOne(
            sql`select * from creator_access where user_id = ${user_id}`
        );
    }

}