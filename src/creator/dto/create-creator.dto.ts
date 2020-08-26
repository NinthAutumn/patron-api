import { IsNotEmpty } from "class-validator";

export class CreateCreatorDTO {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    page_url: string;
    
    @IsNotEmpty()
    description: string;
    
    @IsNotEmpty()
    creating: string;
    
    @IsNotEmpty()
    banner_image_id: number;
    
    @IsNotEmpty()
    cover_image_id: string;
    
    @IsNotEmpty()
    category_id: number;
    
    user_id: number;
    
    @IsNotEmpty()
    creator_rank_id: number;
}