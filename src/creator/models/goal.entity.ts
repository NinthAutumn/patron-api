import { GoalType } from "../creator.enums";
export class Goal {
    id: number;
    description: string;
    goal: number;
    creator_id: number;
    created_at: string;
    updated_at: string;
    type: GoalType;
}