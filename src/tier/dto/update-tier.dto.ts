import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateTierDTO {
    @IsNotEmpty()
    id: number;

    @MaxLength(100)
    @IsNotEmpty()
    title: string;

    @MaxLength(2000)
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;
    
    cover: string;
}