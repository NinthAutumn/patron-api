import { CreateTierDTO } from './../dto/create-tier.dto';
import { Injectable } from "@nestjs/common";
import { InjectSlonik, Slonik } from "src/slonik";

@Injectable()
export class TierRepository {
    constructor(@InjectSlonik() private readonly slonik: Slonik) {}

    createTier(createTierDTO: CreateTierDTO){
        // return this.slonik
    }
}