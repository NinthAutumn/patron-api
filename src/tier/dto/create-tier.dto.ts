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

    creator_id?: number;
    
    @IsNotEmpty()
    cover_image_id: number;
}