import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletsService } from './wallets.service';

@Controller('/wallets')
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) {}

    @Post('/')
    public async createWallet(@Body() createWalletDto: CreateWalletDto, @Req() request: Request) {
        const currentSession = await this.walletsService.findCurrentSessionOrThrow(request);
        const currentUserId = currentSession.userId;

        return this.walletsService.createWallet(createWalletDto, currentUserId);
    }

    @Get('/')
    public findWallets() {
        return this.walletsService.findWallets();
    }

    @Patch('/:walletId')
    public putMoneyOnWallet(@Param('walletId', ParseIntPipe) walletId: number, @Body() { moneyAmount }) {
        return this.walletsService.putMoneyOnWallet(walletId, moneyAmount);
    }
}
