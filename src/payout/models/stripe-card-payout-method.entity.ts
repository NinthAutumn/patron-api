import { CardType } from './../../payment/payment.enums';
export class StripeCardPayoutMethod {
    payout_method_id: number;
    last_four: number;
    brand: CardType;
    expire_date: string;
    stripe_payout_method_id: string;
}