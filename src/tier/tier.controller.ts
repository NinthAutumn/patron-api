import { AuthGuard } from '@nestjs/passport';
import { CreateTierDTO } from './dto/create-tier.dto';
import { Controller, Post, Request, Body, UseGuards } from '@nestjs/common';

@Controller('tier')
export class TierController {

    // @UseGuards(AuthGuard("jwt"))
    // @Post("create")
    // async createTier(@Request() req, @Body() createTierDTO: CreateTierDTO){
        
    // }
}