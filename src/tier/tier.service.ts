import { TierRepository } from './repository/tier.repository';
import { CreateTierDTO } from './dto/create-tier.dto';
import { Injectable, Body, UseGuards, Get, Request } from '@nestjs/common';

@Injectable()
export class TierService {

    constructor(private readonly tierRepository: TierRepository){}
    
    //UseGuards(AuthGuard('jwt'))
    @Get('tier/create')
    async createTier(@Request() req, @Body() createTierDto: CreateTierDTO){
        createTierDto.user_id= req.user_id;
        await this.tierRepository.createTier(createTierDto);
    }
}
