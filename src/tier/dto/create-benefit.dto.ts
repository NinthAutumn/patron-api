import { BenefitPeriod } from './../tier.enums';
import { IsNotEmpty } from 'class-validator';
export class CreateBenefitDTO {
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    type: BenefitPeriod;
}