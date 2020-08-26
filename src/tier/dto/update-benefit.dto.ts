import { BenefitPeriod } from './../tier.enums';
import { IsNotEmpty } from 'class-validator';
export class UpdateBenefitDTO {
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    type: BenefitPeriod;
}