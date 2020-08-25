import { CardType } from './../payment.enums';
export class StripeCardPaymentMethod {
    payment_method_id: number;
    last_four: number;
    brand: CardType
    expire_date: string;
    stripe_payment_method_id: string;
}