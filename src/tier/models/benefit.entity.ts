import { BenefitPeriod } from './../tier.enums';
export class Benefit {
    id: number;
    description: string;
    type: BenefitPeriod;
    created_at: string;
    updated_at: string;
}