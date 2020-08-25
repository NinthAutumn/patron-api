import { CreateTierDTO } from './dto/create-tier.dto';
import { Injectable, Body, UseGuards, Get, Request } from '@nestjs/common';

@Injectable()
export class TierService {
    
    //UseGuards(AuthGuard('jwt'))
    @Get('tier/create')
    async createTier(@Request() req, @Body() createTierDto: CreateTierDTO){

    }
}
