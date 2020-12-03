import { CreateBenefitDTO } from './../dto/create-benefit.dto';
import { Slonik,InjectSlonik } from '../../slonik';
import { sql } from 'slonik';
import { UpdateBenefitDTO } from '../dto/update-benefit.dto';

export class BenefitRepository {
    constructor(@InjectSlonik() private readonly slonik: Slonik){}

    createBenefit(createBenefitDTO: CreateBenefitDTO){
        return this.slonik.query(
            sql`insert into benefit (description, type, created_at, updated_at) values (${createBenefitDTO.description}, ${createBenefitDTO.type}, now(), now())`
        );
    }

    updateBenefit(updateBenefitDTO: UpdateBenefitDTO){
        return this.slonik.query(
            sql`update benefit set description = ${updateBenefitDTO.description}, type = ${updateBenefitDTO.type}, updated_at = now()`
        );
    }
}