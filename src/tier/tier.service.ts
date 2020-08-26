import { CreateBenefitDTO } from './dto/create-benefit.dto';
import { AccessService } from './../access/access.service';
import { UpdateTierDTO } from './dto/update-tier.dto';
import { AuthGuard } from '@nestjs/passport';
import { TierRepository } from './repository/tier.repository';
import { CreateTierDTO } from './dto/create-tier.dto';
import { Injectable, Body, UseGuards, Get, Request, Post, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TierService {

    constructor(private readonly tierRepository: TierRepository, private readonly accessService: AccessService){}
    
    async createTier(req, createTierDTO: CreateTierDTO){
        const access = await this.accessService.findAccessByUserID(req.user_id);

        try{
            if (!access.setting['update_tier'])
                throw new UnauthorizedException("You do not have enough authorisation");
        } catch (err) {
            if (err instanceof UnauthorizedException)
                throw err;
            throw new UnauthorizedException("You don't have access to the creator")
        }

        return await this.tierRepository.createTier(createTierDTO);
    }

    async updateTier(req, updateTierDTO: UpdateTierDTO){
        const access = await this.accessService.findAccessByUserID(req.user_id);

        try{
            if (!access.setting['update_tier'])
                throw new UnauthorizedException("You do not have enough authorisation");
        } catch (err) {
            if (err instanceof UnauthorizedException)
                throw err;
            throw new UnauthorizedException("You don't have access to the creator")
        }

        return await this.tierRepository.updateTier(updateTierDTO);
    }

    async createBenefit(req, createBenefitDTO: CreateBenefitDTO) {
        const access = await this.accessService.findAccessByUserID(req.user_id);

        try{
            if (!access.setting['update_tier'])
                throw new UnauthorizedException("You do not have enough authorisation");
        } catch (err) {
            if (err instanceof UnauthorizedException)
                throw err;
            throw new UnauthorizedException("You don't have access to the creator")
        }

        
    }
}
