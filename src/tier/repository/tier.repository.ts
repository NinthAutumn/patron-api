import { UpdateTierDTO } from './../dto/update-tier.dto';
import { Tier } from './../models/tier.entity';
import { CreateTierDTO } from './../dto/create-tier.dto';
import { sql } from 'slonik';
import { Injectable } from "@nestjs/common";
import { InjectSlonik, Slonik } from "src/slonik";

@Injectable()
export class TierRepository {
    constructor(@InjectSlonik() private readonly slonik: Slonik) {}

    createTier(createTierDTO: CreateTierDTO){
        return this.slonik.query(
            sql`insert into tier (title, description, cover_image_id, price, creator_id, created_at, updated_at) values (${createTierDTO.title}, ${createTierDTO.description}, ${createTierDTO.cover_image_id}, ${createTierDTO.price}, ${createTierDTO.creator_id}, now(), now())`
            );
    }

    findTierById(id: number): Promise<Tier>{
        return this.slonik.one(
            sql`select * from tier where id = ${id}`
        );
    }

    findTierByName(creator_id: number, title: string): Promise<Tier> {
        return this.slonik.one(
            sql`select * from tier where title = ${title} and creator_id`
        );
    }

    updateTier(updateTierDTO: UpdateTierDTO){
        return this.slonik.query(
            sql`update tier set title = ${updateTierDTO.title}, description = ${updateTierDTO.description}, price = ${updateTierDTO.price}, cover_image_id = ${updateTierDTO.cover_image_id}, updated_at = now() where id = ${updateTierDTO.id}`
        );
    }
}