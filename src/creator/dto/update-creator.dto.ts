import { IsNotEmpty } from "class-validator";

export class UpdateCreatorDTO {
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
    
    user_id: string;

    @IsNotEmpty()
    category_id: number;
}