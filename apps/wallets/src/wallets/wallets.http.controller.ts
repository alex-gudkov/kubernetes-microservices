import { AuthGuard, CurrentUserIdDecorator } from '@libs/auth-utils';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletsEntity } from './entities/wallets.entity';
import { WalletsService } from './wallets.service';

@Controller('/wallets')
@UseGuards(AuthGuard)
export class WalletsHttpController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post('/')
  public createWallet(
    @Body() createWalletDto: CreateWalletDto,
    @CurrentUserIdDecorator() currentUserId: number,
  ): Promise<WalletsEntity> {
    return this.walletsService.createWallet(createWalletDto, currentUserId);
  }

  @Get('/')
  public findWallets(): Promise<WalletsEntity[]> {
    return this.walletsService.findWallets();
  }

  @Patch('/:walletId/put-money')
  public putMoneyOnWallet(
    @Param('walletId', ParseIntPipe) walletId: number,
    @Body() { moneyAmount },
  ): Promise<WalletsEntity> {
    return this.walletsService.putMoneyOnWallet(walletId, moneyAmount);
  }
}
