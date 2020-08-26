import { Slonik } from './../../../dist/slonik/interfaces/slonik.interface.d';
import { InjectSlonik } from './../../slonik/inject-slonik.decorator';
import { Injectable } from "@nestjs/common";
import { Access } from '../models/access.entity';
import { sql } from 'slonik';

@Injectable()
export class AccessRepository {
    constructor(@InjectSlonik() private readonly slonik: Slonik) {}

    findByUserID(user_id): Promise<Access>{
        return this.slonik.maybeOne(
            sql`select a.* from access a inner join creator_access ca on ca.user_id = ${user_id}`
        );
    }
}
