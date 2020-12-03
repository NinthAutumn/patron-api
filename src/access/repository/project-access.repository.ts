import { Slonik,InjectSlonik } from '../../slonik';

import { Injectable } from "@nestjs/common";
import { ProjectAccess } from '../models/creator-access.entity';
import { sql } from 'slonik';

@Injectable()
export class ProjectAccessRepository {
    constructor(@InjectSlonik() private readonly slonik: Slonik) {}
    
    findByUserId(user_id: number): Promise<ProjectAccess>{
        return this.slonik.maybeOne(
            sql`select * from project_access where user_id = ${user_id}`
        );
    }

}