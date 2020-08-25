import { CreateTierDTO } from './../dto/create-tier.dto';
import { sql } from 'slonik';
import { Injectable } from "@nestjs/common";
import { InjectSlonik, Slonik } from "src/slonik";

@Injectable()
export class TierRepository {
    constructor(@InjectSlonik() private readonly slonik: Slonik) {}

    createTier(createTierDTO: CreateTierDTO){
        return this.slonik.query(
            sql`insert into (title, description, cover, price, creator_id, created_at, updated_at) values (${createTierDTO.title}, ${createTierDTO.description}, ${createTierDTO.cover}, ${createTierDTO.price}, ${createTierDTO.user_id}, now(), now())`)
    }
}