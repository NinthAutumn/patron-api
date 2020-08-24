import { User } from './../../user/models/user.entity';
export class Creator {
    id: number;
    name: string;
    page_url: string;
    description: string;
    creating: string;
    banner_image_id: number;
    cover: string;
    category_id: number;
    user_id: number;
    user: User;
    creator_rank_id: number;
    updated_at: string;
    created_at: string;
}