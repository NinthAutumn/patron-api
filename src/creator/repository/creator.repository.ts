import { UpdateCreatorDTO } from './../dto/update-creator.dto';
import { Slonik,InjectSlonik } from '../../slonik';

import { Injectable } from '@nestjs/common';
import { sql } from 'slonik';
import { CreateCreatorDTO } from '../dto/create-creator.dto';

@Injectable()
export class CreatorRepository {
    constructor(@InjectSlonik() private readonly slonik: Slonik) {}

    createCreator(createCreatorDTO: CreateCreatorDTO) {
        return this.slonik.query(
            sql`insert into creator (name, page_url, description, creating, banner_image_id, cover_image_id, category_id, user_id, creator_rank_id, updated_at, created_at) values (${createCreatorDTO.name}, ${createCreatorDTO.page_url}, ${createCreatorDTO.description}, ${createCreatorDTO.creating}, ${createCreatorDTO.banner_image_id}, ${createCreatorDTO.cover_image_id}, ${createCreatorDTO.category_id}, ${createCreatorDTO.user_id}, ${createCreatorDTO.creator_rank_id}, now(), now())`
        );
    }

    updateCreator(updateCreatorDTO: UpdateCreatorDTO) {
        return this.slonik.query(
            sql`update creator set name = ${updateCreatorDTO.name}, page_url = ${updateCreatorDTO.page_url}, description = ${updateCreatorDTO.description}, creating = ${updateCreatorDTO.creating}, banner_image_id = ${updateCreatorDTO.banner_image_id}, cover_image_id = ${updateCreatorDTO.cover_image_id}, category_id = ${updateCreatorDTO.category_id}, updated_at = now() where user_id = ${updateCreatorDTO.user_id}`
        );
    }

    updateCreatorRank(rank_id: number, user_id: number) {
        return this.slonik.query(
            sql`update creator set creator_rank_id = ${rank_id} where user_id = ${user_id}`
        );
    }
}