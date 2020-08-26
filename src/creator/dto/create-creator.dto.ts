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
    cover: string;
    @IsNotEmpty()
    category_id: number;
    @IsNotEmpty()
    user_id: number;
    @IsNotEmpty()
    creator_rank_id: number;
}