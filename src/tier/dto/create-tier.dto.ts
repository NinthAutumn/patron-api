import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTierDTO {
    @MaxLength(100)
    @IsNotEmpty()
    title: string;

    @MaxLength(2000)
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    user_id?: number;
    
    cover: string;
}