import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTierDTO {
    @MaxLength(100)
    @IsNotEmpty()
    name: string;

    @MaxLength(2000)
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    userID?: number;
    
    cover: string;
}